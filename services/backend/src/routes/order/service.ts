import shared, { type Order } from '@monorepo/shared';
import { each, forEach, pipe, toAsync } from '@fxts/core';
import * as cartRepository from '../cart/repository';
import * as productRepository from '../product/repository';
import * as orderRepository from '../order/repository';
import { NotEnoughStockError, PaymentError, PaymentForgeryError } from '../../shared/error';
import { portone } from '../../shared/portone';

const webhook = async (payment_id: string, transaction: any) => {
  const payment = await portone.payment.getPayment(payment_id);

  if (payment === null) {
    throw new PaymentError();
  }

  const { id, status, amount, orderName: order_name, customData, method } = payment;
  const { userId: user_id } = JSON.parse(customData!);

  const order = await orderRepository.findById(id);

  switch (status) {
    case 'PAID': {
      if (order.status === 'SUCCESS') break;
      if (order.name !== order_name || !shared.parseSafeNumeric(amount.total)?.equals(amount.total))
        throw new PaymentForgeryError();

      // 카트 목록을 비움
      const cart = await cartRepository.findCartById(user_id);

      await pipe(
        toAsync(cart.cart_product_items),
        forEach((cart_product_item) => cartRepository.remove(cart_product_item.id, transaction)),
      );

      // 상품 테이블 주문 수량 변경
      const order_product_items = await orderRepository.findOrderProductById(order.id);

      await pipe(
        toAsync(order_product_items),
        forEach((order_product_item) =>
          productRepository.decrease(order_product_item.product_id, order_product_item.quantity, transaction),
        ),
      );

      // 오더 상태 성공으로 변경
      await updateOrder(order.id, { status: 'SUCCESS', payment_method: method?.type }, transaction);

      break;
    }
    case 'CANCELLED': {
      // 오더 상태 변경
      await updateOrder(order.id, { status: 'CANCELED' }, transaction);

      if (order.status === 'PENDING') break;

      // 상품 테이블 주문 수량 변경
      const order_product_items = await orderRepository.findOrderProductById(order.id);

      await pipe(
        toAsync(order_product_items),
        forEach((order_product_item) =>
          productRepository.increase(order_product_item.product_id, order_product_item.quantity, transaction),
        ),
      );

      break;
    }
    case 'FAILED': {
      await failed(order.id, transaction);
      break;
    }
    case 'READY': {
      break;
    }
  }
};

const prepareOrder = async (
  data: {
    order_name: string;
    payment_id: string;
    total_price: number;
    user_id: number;
  },
  transaction: any,
) => {
  const { order_name, payment_id, total_price, user_id } = data;

  const cart = await cartRepository.findCartById(user_id);

  for (const cart_product_item of cart.cart_product_items) {
    const product = await productRepository.findById(cart_product_item.product_id);

    if (!product || product.stock < cart_product_item.quantity) {
      throw new NotEnoughStockError(`${product.name}의 재고가 부족합니다.`);
    }
  }

  const order = await orderRepository.create(
    {
      total_price,
      payment_id,
      user_id,
      name: order_name,
      status: 'PENDING',
    },
    transaction,
  );

  await pipe(
    cart.cart_product_items,
    toAsync,
    each((cart_product_item) =>
      orderRepository.createOrderProduct(
        { product_id: cart_product_item.product_id, order_id: order.id, quantity: cart_product_item.quantity },
        transaction,
      ),
    ),
  );

  return order;
};

const updateOrder = (order_id: number, data: Partial<Order>, transaction: any) => {
  return orderRepository.update(order_id, data, transaction);
};

const getOrderById = (payment_id: string) => {
  return orderRepository.findById(payment_id);
};

const getOrdersByQuery = async ({
  user_id,
  limit,
  offset,
  status,
}: {
  user_id: number;
  limit: number;
  offset: number;
  status?: Order['status'];
}) => {
  const count = await orderRepository.count(user_id, status);
  const orders = await orderRepository.findByQuery({ user_id, limit, offset, status });
  return { orders, total: Math.ceil(count / limit) };
};

const cancel = async (data: { payment_id: string; reason: string }, transaction: any) => {
  const { payment_id, reason } = data;

  const order = await orderRepository.findById(payment_id);

  if (order.status === 'PENDING') {
    return updateOrder(order.id, { status: 'CANCELED' }, transaction);
  }

  return portone.payment.cancelPayment({ paymentId: payment_id, reason });
};

const failed = (order_id: number, transaction: any) => {
  return orderRepository.remove(order_id, transaction);
};

export { prepareOrder, webhook, updateOrder, getOrderById, cancel, getOrdersByQuery };

import shared, { type Order } from '@monorepo/shared';
import * as cartRepository from '../cart/repository';
import * as productRepository from '../product/repository';
import * as orderRepository from '../order/repository';
import { NotEnoughStockError, PaymentError, PaymentForgeryError } from '../../shared/error';
import { portone } from '../../shared/portone';

// @todo: 웹훅 서비스 로직 분리
// @think: 구매/취소인 경우에도 재고 수량 검증이 필요?
const webhook = async (payment_id: string, transaction: any) => {
  const payment = await portone.payment.getPayment(payment_id);

  // @todo: 포트원에 결제건이 없음, 관련 order, order_product 테이블 초기화
  if (payment === null) {
    throw new PaymentError();
  }

  const { id, status, amount, orderName: order_name, customData, method } = payment;
  const { userId: user_id } = JSON.parse(customData!);

  const order = await orderRepository.findById(id);

  switch (status) {
    case 'READY': {
      if (order) break;

      await prepareOrder(
        {
          payment_id,
          user_id,
          order_name,
          total_price: amount.total,
        },
        transaction,
      );

      break;
    }
    case 'PAID': {
      // 상품 테이블 주문 수량 변경
      if (order.name !== order_name || !shared.parseSafeNumeric(amount.total)?.equals(amount.total)) {
        throw new PaymentForgeryError();
      }

      // 카트 목록을 비움
      const cart = await cartRepository.findCartById(user_id);

      for (const cart_product_item of cart.cart_product_items) {
        await cartRepository.remove(cart_product_item.id, transaction);
      }

      // 상품 테이블 주문 수량 변경
      const order_product_items = await orderRepository.findOrderProductById(order.id);

      for (const order_product_item of order_product_items) {
        await productRepository.decrease(order_product_item.product_id, order_product_item.quantity, transaction);
      }

      // 오더 상태 성공으로 변경
      await updateOrder(order.id, { status: 'SUCCESS', payment_method: method?.type }, transaction);

      break;
    }
    case 'FAILED': {
      // @todo: request cancel portone api
      break;
    }
    case 'CANCELLED': {
      // 오더 상태 변경
      await updateOrder(order.id, { status: 'CANCELED' }, transaction);

      // 상품 테이블 주문 수량 변경
      const order_product_items = await orderRepository.findOrderProductById(order.id);

      for (const order_product_item of order_product_items) {
        await productRepository.increase(order_product_item.id, order_product_item.quantity, transaction);
      }

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

    if (!product || product.stock < cart_product_item.quantity)
      throw new NotEnoughStockError(`${product.name}의 재고가 부족합니다.`);
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

  for (const cart_product_item of cart.cart_product_items) {
    await orderRepository.createOrderProduct(
      { product_id: cart_product_item.product_id, order_id: order.id, quantity: cart_product_item.quantity },
      transaction,
    );
  }

  return order;
};

const updateOrder = (order_id: number, data: Partial<Order>, transaction: any) => {
  return orderRepository.update(order_id, data, transaction);
};

const findById = (payment_id: string) => {
  return orderRepository.findById(payment_id);
};

const cancel = (payment_id: string) => {
  return portone.payment.cancelPayment({ paymentId: payment_id, reason: '변심으로 인한 결제 취소' }).catch((error) => {
    throw error;
  });
};

// @todo: 주문 취소 and 주문 실패

export { prepareOrder, webhook, updateOrder, findById, cancel };

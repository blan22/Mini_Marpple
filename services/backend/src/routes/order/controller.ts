import { type RequestHandler } from 'express';
import * as orderService from './service';
import POOL from '../../shared/db';
import { TransactionalError } from '../../shared/error';
import { getOrderStatusByQuery, paging } from '../../shared/utils';

const webhook: RequestHandler = async (req, res) => {
  const transaction = await POOL.TRANSACTION();

  try {
    await orderService.webhook(req.body.data.paymentId, transaction);

    await transaction.COMMIT();
    res.status(200).json({ message: '결제 웹훅 성공' });
  } catch (error) {
    await transaction.ROLLBACK();
    throw new TransactionalError();
  }
};

const getOrder: RequestHandler<{ id: string }> = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);

  if (!order) res.status(405).json({ message: '결제건을 찾을 수 없습니다.' });
  else res.status(200).json({ message: '결제 건을 성공적으로 조회했습니다.', data: order });
};

const getOrders: RequestHandler<{}, {}, {}, { page: string; limit: string; status: string }> = async (req, res) => {
  const { page = '1', limit: qLimit = '10', status = 'all' } = req.query;
  const { offset, limit } = paging(parseInt(page), parseInt(qLimit));

  const orders = await orderService.getOrdersByQuery({
    offset,
    limit,
    user_id: req.user!.id,
    status: getOrderStatusByQuery(status),
  });

  res.status(200).json({ message: '구매내역을 성공적으로 조회했습니다.', data: orders });
};

const deleteOrder: RequestHandler = async (req, res) => {
  const transaction = await POOL.TRANSACTION();

  try {
    const result = await orderService.cancel(req.body, transaction);

    await transaction.COMMIT();
    res.status(200).json({ message: '주문을 취소했습니다.', data: result });
  } catch (error) {
    await transaction.ROLLBACK();
    throw error;
  }
};

const createOrder: RequestHandler = async (req, res) => {
  const { order_name, payment_id, total_price } = req.body;
  const transaction = await POOL.TRANSACTION();

  try {
    const result = await orderService.prepareOrder(
      { payment_id, total_price, order_name, user_id: req.user!.id },
      transaction,
    );

    await transaction.COMMIT();
    res.status(200).json({ message: '오더 생성 완료', data: result });
  } catch (error) {
    await transaction.ROLLBACK();
    throw error;
  }
};

export { webhook, getOrder, deleteOrder, getOrders, createOrder };

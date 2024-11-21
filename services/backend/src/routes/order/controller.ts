import { type RequestHandler } from 'express';
import * as orderService from './service';
import POOL from '../../shared/db';
import { TransactionalError } from '../../shared/error';

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

const findById: RequestHandler<{ id: string }> = async (req, res) => {
  const order = await orderService.findById(req.params.id);

  if (!order) res.status(405).json({ message: '결제건을 찾을 수 없습니다.' });
  else res.status(200).json({ message: '결제 건을 성공적으로 조회했습니다.', data: order });
};

const cancel: RequestHandler<{ id: string }> = async (req, res) => {
  const result = await orderService.cancel(req.params.id);

  res.status(200).json({ message: '주문을 취소했습니다.', data: result });
};

export { webhook, findById, cancel };

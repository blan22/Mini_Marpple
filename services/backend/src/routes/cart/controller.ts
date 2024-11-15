import { type RequestHandler } from 'express';
import * as cartService from './service';

const getCart: RequestHandler = async (req, res) => {
  const cart = await cartService.findById(req.user!.id);
  res.status(200).json({ message: '성공적으로 카트를 불러왔습니다.', data: cart });
};

const addToCart: RequestHandler = async (req, res) => {
  await cartService.addToCart(req.user!.id, req.body);
  res.status(200).json({ message: '성공적으로 카트에 상품을 담았습니다.' });
};

const updateCart: RequestHandler<{ id: string }> = async (req, res) => {
  const { quantity } = req.body;

  const result = await cartService.updateCart(parseInt(req.params.id), quantity);
  res.status(200).json({ message: '성공적으로 카트에 상품을 담았습니다.', data: result });
};

export { getCart, addToCart, updateCart };

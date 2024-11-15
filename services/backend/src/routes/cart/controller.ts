import { type RequestHandler } from 'express';
import * as cartService from './service';

const getCart: RequestHandler = async (req, res) => {
  const cart = await cartService.findById(req.user!.id);
  res.status(200).json({ message: '성공적으로 카트를 불러왔습니다.', data: cart });
};

const addProductToCart: RequestHandler = async (req, res) => {
  await cartService.addProductToCart(req.user!.id, req.body);
  res.status(200).json({ message: '성공적으로 카트에 상품을 담았습니다.' });
};

const updateCartProduct: RequestHandler<{ id: string }> = async (req, res) => {
  const { quantity } = req.body;

  const result = await cartService.updateCartProduct(parseInt(req.params.id), quantity);
  res.status(200).json({ message: '성공적으로 카트에 상품을 담았습니다.', data: result });
};

const deleteCartProduct: RequestHandler = async (req, res) => {
  const result = await cartService.deleteCartProduct(req.user!.id, parseInt(req.params.id));
  res.status(200).json({ message: '성공적으로 카트에 담긴 상품을 제거했습니다.', data: result });
};

export { getCart, addProductToCart, updateCartProduct, deleteCartProduct };

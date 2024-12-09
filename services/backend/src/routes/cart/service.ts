import * as cartRepository from './repository';
import { ForbiddenError } from '../../shared/error';
import { each, pipe, toAsync } from '@fxts/core';

const getCart = (user_id: number) => {
  return cartRepository.findCartById(user_id);
};

const addProductToCart = async (user_id: number, data: { product_id: number; stock: number }) => {
  const { product_id, stock } = data;
  const cart = await cartRepository.findCartById(user_id);
  const cart_product_item = cart.cart_product_items?.find((item) => item.product_id === product_id);

  // 유저의 카트 목록에 카트에 추가하는 상품이 이미 존재한다면, 수량을 증가시킨다.
  if (cart_product_item) {
    return await cartRepository.increase(cart_product_item.id, stock);
  }

  // 존재하지 않는다면, 카트에 상품을 추가한다.
  // 미비된 부분, 들어온 수량이 재고보다 크다면 에러 핸들링을 해줘야 함
  return await cartRepository.create({ product_id, quantity: stock, cart_id: cart.id });
};

// 세션 id와 받아온 카트의 유저 아이디 한번 더 교차 검증 필요
// 애초에 서버에서 로그인 여부를 파악하고 그에 맞는 카트 결과를 클라이언트에게 넘김
// 클라이언트는 맞는 카트 데이터를 받고 api 콜을 할 때도 그 카트에 속한 id를 사용해 요청함
// 서버에서는 그거만 믿고 db 조작을 할 수 없음
const updateCartProduct = (cart_product_id: number, quantity: number) => {
  return cartRepository.update(cart_product_id, quantity);
};

const deleteCartProductById = async (user_id: number, cart_product_id: number) => {
  const cart_product = await cartRepository.findCartProductById(user_id, cart_product_id);

  if (!cart_product) new ForbiddenError();

  return await cartRepository.remove(cart_product_id);
};

const deleteCartProductAll = async (user_id: number) => {
  const cart = await cartRepository.findCartById(user_id);

  await pipe(
    cart.cart_product_items,
    toAsync,
    each((cart_product_item) => cartRepository.remove(cart_product_item.id)),
  );
};

export { addProductToCart, getCart, updateCartProduct, deleteCartProductById, deleteCartProductAll };

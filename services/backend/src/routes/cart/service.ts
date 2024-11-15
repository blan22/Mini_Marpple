import * as cartRepository from './repository';

const findById = (user_id: number) => {
  return cartRepository.findById(user_id);
};

const addToCart = async (user_id: number, data: { product_id: number; stock: number }) => {
  const { product_id, stock } = data;
  const cart = await cartRepository.findById(user_id);
  const cart_product_item = cart.cart_product_items?.find((item) => item.product_id === product_id);

  // 유저의 카트 목록에 카트에 추가하는 상품이 이미 존재한다면, 수량을 증가시킨다.
  if (cart_product_item) {
    return await cartRepository.increase(cart_product_item.id, stock);
  }

  // 존재하지 않는다면, 카트에 상품을 추가한다.
  // 미비된 부분, 들어온 수량이 재고보다 크다면 에러 핸들링을 해줘야 함
  return await cartRepository.create({ product_id, quantity: stock, cart_id: cart.id });
};

const updateCart = async (cart_product_id: number, quantity: number) => {
  return await cartRepository.update(cart_product_id, quantity);
};

export { addToCart, findById, updateCart };

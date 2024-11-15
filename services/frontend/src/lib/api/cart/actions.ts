import { patch, post, remove } from '../../fetcher';
import type { CartProcess, CartProductQuantityUpdate } from '@monorepo/shared';

const addToCart = (productId: number, data: CartProcess) => {
  return post('http://localhost:4000/cart', { productId, ...data }, { credentials: 'include' });
};

const updateCartQuantity = (cartProductId: number, data: CartProductQuantityUpdate) => {
  return patch(`http://localhost:4000/cart/${cartProductId}`, data, { credentials: 'include' });
};

const deleteCartProduct = (cartProductId: number) => {
  return remove('http://localhost:4000/cart', undefined, {
    credentials: 'include',
    params: cartProductId,
  });
};

export { addToCart, updateCartQuantity, deleteCartProduct };

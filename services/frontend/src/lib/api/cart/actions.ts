import { patch, post } from '../../fetcher';
import type { CartProcess, CartProductQuantityUpdate } from '@monorepo/shared';

const addToCart = (product_id: number, data: CartProcess) => {
  return post('http://localhost:4000/cart', { product_id, ...data }, { credentials: 'include' });
};

const updateCartQuantity = (cartProductId: number, data: CartProductQuantityUpdate) => {
  return patch(`http://localhost:4000/cart/${cartProductId}`, data, { credentials: 'include' });
};

export { addToCart, updateCartQuantity };

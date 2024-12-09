import { patch, post, remove } from '../../fetcher';
import type { CartProcess, CartProductQuantityUpdate } from '@monorepo/shared';

const addToCart = (productId: number, data: CartProcess) => {
  return post(`/api/cart`, { product_id: productId, ...data }, { credentials: 'include' });
};

const updateCartQuantity = (cartProductId: number, data: CartProductQuantityUpdate) => {
  return patch(`/api/cart/${cartProductId}`, data, { credentials: 'include' });
};

const deleteCartProduct = (cartProductId: number) => {
  return remove(`/api/cart`, undefined, {
    credentials: 'include',
    params: cartProductId,
  });
};

export { addToCart, updateCartQuantity, deleteCartProduct };

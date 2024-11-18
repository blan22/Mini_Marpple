import { SERVER_ENDPOINT } from '../../../shared/constants';
import { patch, post, remove } from '../../fetcher';
import type { CartProcess, CartProductQuantityUpdate } from '@monorepo/shared';

const addToCart = (productId: number, data: CartProcess) => {
  return post(`${SERVER_ENDPOINT}/cart`, { product_id: productId, ...data }, { credentials: 'include' });
};

const updateCartQuantity = (cartProductId: number, data: CartProductQuantityUpdate) => {
  return patch(`${SERVER_ENDPOINT}/cart/${cartProductId}`, data, { credentials: 'include' });
};

const deleteCartProduct = (cartProductId: number) => {
  return remove(`${SERVER_ENDPOINT}/cart`, undefined, {
    credentials: 'include',
    params: cartProductId,
  });
};

export { addToCart, updateCartQuantity, deleteCartProduct };

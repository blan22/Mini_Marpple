import { get } from '../../fetcher';
import type { ServerResponse } from '../../../types/common';
import type { Cart, CartProduct, Product } from '@monorepo/shared';
import type { Request } from 'express';

const getCart = () => {
  return get<ServerResponse<Cart & { cart_product_items: (CartProduct & { product: Product })[] }>>(
    'http://localhost:4000/cart',
    { credentials: 'include' },
  );
};

const getCartSS = async (req: Request) => {
  const headers = new Headers();
  headers.set('cookie', `${req.get('cookie')}`);
  headers.set('Content-Type', 'application/json');
  return get<ServerResponse<Cart & { cart_product_items: (CartProduct & { product: Product })[] }>>(
    'http://localhost:4000/cart',
    { credentials: 'include', headers },
  );
};

export { getCart, getCartSS };

import { get } from '../../fetcher';
import type { ServerResponse } from '../../../types/common';
import type { Cart, CartProduct, Product } from '@monorepo/shared';

const getCart = () => {
  return get<ServerResponse<Cart & { cart_product_items: (CartProduct & { product: Product })[] }>>(
    'http://localhost:4000/cart',
    { credentials: 'include' },
  );
};

export { getCart };

import { ProductPage } from './page';
import { ProductDetailPage } from './detail/page';

export const productRouter = {
  ['/product']: ProductPage,
  ['/product/:id']: ProductDetailPage,
};

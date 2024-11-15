import { CartPage } from './cart/page';
import { OrdersPage } from './orders/page';

export const userRouter = {
  ['/@/cart']: CartPage,
  ['/@/orders']: OrdersPage,
};

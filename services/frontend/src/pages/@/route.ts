import { CartPage } from './cart/page';
import { OrderPage } from './orders/page';
import type { RenderHandlerType } from '../../types/common';
import { MetaView } from '@rune-ts/server';
import { createMetaData } from '../../lib/utils';
import { getCartSS } from '../../lib/api';

export const userRouter = {
  ['/@/cart']: CartPage,
  ['/@/order']: OrderPage,
};

export const cartHandler: RenderHandlerType<typeof CartPage> = (factory) => {
  return async (req, res) => {
    const cart = await getCartSS(req);

    res.send(new MetaView(factory({ cart: cart.data }), createMetaData({ head: { title: 'CART' } })).toHtml());
  };
};

export const orderHandler: RenderHandlerType<typeof OrderPage> = (factory) => {
  return async (_, res) => {
    res.send(new MetaView(factory({}), createMetaData({ head: { title: 'ORDER' } })).toHtml());
  };
};

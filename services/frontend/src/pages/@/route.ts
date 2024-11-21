import { CartPage } from './cart/page';
import { OrderPage } from './orders/page';
import type { RenderHandlerType } from '../../types/common';
import { MetaView } from '@rune-ts/server';
import { createMetaData } from '../../lib/utils';
import { getCartSS, getOrderByIdSS } from '../../lib/api';
import { OrderCompletePage } from './orders/complete/page';
import { OrderFailedPage } from './orders/failed/page';

export const userRouter = {
  ['/@/cart']: CartPage,
  ['/@/order']: OrderPage,
  ['/@/order/complete']: OrderCompletePage,
  ['/@/order/failed']: OrderFailedPage,
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

export const orderCompleteHandler: RenderHandlerType<typeof OrderCompletePage> = (factory) => {
  return async (req, res) => {
    const result = await getOrderByIdSS(req);

    res.send(
      new MetaView(factory({ order: result.data }), createMetaData({ head: { title: 'ORDER COMPLETE' } })).toHtml(),
    );
  };
};

export const orderFailedHandler: RenderHandlerType<typeof OrderFailedPage> = (factory) => {
  return async (_, res) => {
    res.send(new MetaView(factory({}), createMetaData({ head: { title: 'ORDER FAILED' } })).toHtml());
  };
};

import * as PortOne from '@portone/browser-sdk/v2';
import { type CancelOrder, type Order } from '@monorepo/shared';
import { ONBOARDING_BASE_URL, PORTONE_CHANNEL_KEY, PORTONE_STORE_ID } from '../../../shared/constants';
import { post, remove } from '../../fetcher';
import type { ServerResponse } from '../../../types/common';

const prepareOrder = ({
  cartId,
  orderName,
  payMethod,
  paymentId,
  totalPrice,
}: {
  cartId: number;
  orderName: string;
  payMethod: string;
  paymentId: string;
  totalPrice: number;
}): Promise<ServerResponse<Order>> => {
  return post(
    '/api/order',
    {
      cart_id: cartId,
      order_name: orderName,
      payment_method: payMethod,
      payment_id: paymentId,
      total_price: totalPrice,
    },
    { credentials: 'include' },
  );
};

const requestPayment = ({
  paymentId,
  payMethod,
  totalAmount,
  orderName,
  userId,
}: {
  paymentId: string;
  orderName: string;
  totalAmount: number;
  userId: number;
  payMethod: 'CARD';
}) => {
  return PortOne.requestPayment({
    redirectUrl: ONBOARDING_BASE_URL,
    storeId: PORTONE_STORE_ID,
    channelKey: PORTONE_CHANNEL_KEY,
    currency: 'CURRENCY_KRW',
    customer: {
      email: 'oponize@naver.com',
      phoneNumber: '01062579881',
      fullName: 'Junseo Park',
      lastName: 'Park',
      firstName: 'Junseo',
    },
    customData: {
      userId,
    },
    orderName,
    totalAmount,
    paymentId,
    payMethod,
  });
};

const cancelOrder = (data: CancelOrder) => {
  return remove('/api/order', data, { credentials: 'include' });
};

export { requestPayment, prepareOrder, cancelOrder };

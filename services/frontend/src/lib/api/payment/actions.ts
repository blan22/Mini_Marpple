import * as PortOne from '@portone/browser-sdk/v2';
import { PORTONE_CHANNEL_KEY, PORTONE_STORE_ID } from '../../../shared/constants';

export type Customer = {
  customerId?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  // address?: Entity.Address;
  zipcode?: string;
  // gender?: Entity.Gender;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
};

const dummy = {
  paymentId: '2874d90e-e3db-41cb-8ca4-3e321f4be797',
  transactionType: 'PAYMENT',
  txId: '01933e9b-ea4d-2c01-595f-16b06623082f',
};

const requestPayment = (paymentId: string, payMethod: 'CARD') => {
  return PortOne.requestPayment({
    storeId: PORTONE_STORE_ID,
    channelKey: PORTONE_CHANNEL_KEY,
    orderName: '나이키 와플 트레이너 2 SD',
    totalAmount: 1000,
    currency: 'CURRENCY_KRW',
    customer: {
      email: 'oponize@naver.com',
      phoneNumber: '01062579881',
      fullName: 'Junseo Park',
      lastName: 'Park',
      firstName: 'Junseo',
    },
    paymentId,
    payMethod,
  });
};

export { requestPayment };

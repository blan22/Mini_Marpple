import type { Request } from 'express';
import { get } from '../../fetcher';
import { SERVER_ENDPOINT } from '../../../shared/constants';

const getOrderByIdSS = (req: Request) => {
  const headers = new Headers();
  headers.set('cookie', `${req.get('cookie')}`);
  headers.set('Content-Type', 'application/json');

  if (!req.query?.paymentId) return null;

  return get(`${SERVER_ENDPOINT}/order`, { headers, credentials: 'include', params: req.query.paymentId });
};

const getOrdersSS = (req: Request) => {
  const headers = new Headers();
  headers.set('cookie', `${req.get('cookie')}`);
  headers.set('Content-Type', 'application/json');

  return get(`${SERVER_ENDPOINT}/order`, { headers, credentials: 'include' });
};

export { getOrdersSS, getOrderByIdSS };

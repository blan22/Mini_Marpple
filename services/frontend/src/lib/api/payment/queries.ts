import type { Request } from 'express';
import { get } from '../../fetcher';
import { ORDER_STATUS_UPPER_MAP, SERVER_ENDPOINT } from '../../../shared/constants';
import type { ServerResponse } from '../../../types/common';
import type { Orders } from '../../../types/order';

interface GetOrderQuery {
  page: number;
  limit: number;
  status?: keyof typeof ORDER_STATUS_UPPER_MAP;
}

const getOrderByIdSS = (req: Request) => {
  const headers = new Headers();
  headers.set('cookie', `${req.get('cookie')}`);
  headers.set('Content-Type', 'application/json');

  if (!req.query?.paymentId) return null;

  return get(`${SERVER_ENDPOINT}/order`, { headers, credentials: 'include', params: req.query.paymentId });
};

const getOrdersByQuerySS = (req: Request, { page, limit, status }: GetOrderQuery) => {
  const headers = new Headers();
  headers.set('cookie', `${req.get('cookie')}`);
  headers.set('Content-Type', 'application/json');

  return get(`${SERVER_ENDPOINT}/order`, {
    headers,
    credentials: 'include',
    query: {
      page,
      limit,
      status,
    },
  });
};

const getOrdersByQuery = ({
  page,
  limit,
  status,
}: GetOrderQuery): Promise<ServerResponse<{ orders: Orders; total: number }>> => {
  return get(`/api/order`, {
    credentials: 'include',
    query: {
      page,
      limit,
      status,
    },
  });
};

export { getOrdersByQuerySS, getOrderByIdSS, getOrdersByQuery };

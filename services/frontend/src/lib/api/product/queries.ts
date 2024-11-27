import type { Product } from '@monorepo/shared';
import { get } from '../../fetcher';
import { SERVER_ENDPOINT } from '../../../shared/constants';
import type { ServerResponse } from '../../../types/common';

interface GetProductQuery {
  page: number;
  limit: number;
  category?: string;
}

const getProductsByQuery = (
  query: GetProductQuery,
): Promise<ServerResponse<{ products: Product[]; total: number }>> => {
  const { page, limit, category } = query;
  return get(`/api/product`, {
    query: {
      page,
      limit,
      category,
    },
  });
};

const getProductById = (productId: number) => {
  return get(`/api/product`, { params: productId });
};

const getProductsByQuerySS = (
  query: GetProductQuery,
): Promise<ServerResponse<{ products: Product[]; total: number }>> => {
  const { page, limit, category } = query;
  return get(`${SERVER_ENDPOINT}/product`, {
    query: {
      page,
      limit,
      category,
    },
  });
};

const getProductByIdSS = (productId: number) => {
  return get(`${SERVER_ENDPOINT}/product`, { params: productId });
};

export { getProductsByQuery, getProductById, getProductsByQuerySS, getProductByIdSS };

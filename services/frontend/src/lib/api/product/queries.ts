import { get } from '../../fetcher';
import { SERVER_ENDPOINT } from '../../../shared/constants';

const getProductsByQuery = () => {
  return get(`/api/product`, {
    query: {
      page: 1,
      limit: 10,
    },
  });
};

const getProductById = (productId: number) => {
  return get(`/api/product`, { params: productId });
};

const getProductsByQuerySS = () => {
  return get(`${SERVER_ENDPOINT}/product`, {
    query: {
      page: 1,
      limit: 10,
    },
  });
};

const getProductByIdSS = (productId: number) => {
  return get(`${SERVER_ENDPOINT}/product`, { params: productId });
};

export { getProductsByQuery, getProductById, getProductsByQuerySS, getProductByIdSS };

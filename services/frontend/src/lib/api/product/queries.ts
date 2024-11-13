import { get } from '../../fetcher';

const getProductsByQuery = () => {
  return get('http://localhost:4000/product', {
    query: {
      page: 1,
      limit: 10,
    },
  });
};

const getProductById = (id: number) => {
  return get('http://localhost:4000/product', { params: id });
};

export { getProductsByQuery, getProductById };

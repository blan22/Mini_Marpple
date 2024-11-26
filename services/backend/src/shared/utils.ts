import CONFIG from './config';

const ORDER_STATUS_QUERY_MAP = {
  all: 'ALL',
  canceled: 'CANCELED',
} as const;

const createThumnbnailUrl = (thumbnail: string = '') => {
  return `${CONFIG.DOMAIN}/images/${thumbnail}`;
};

const paging = (page: number = 1, limit: number = 10) => {
  return {
    limit,
    offset: (page - 1) * limit,
  };
};

const getOrderStatusByQuery = (query: string) => {
  if (query === 'canceled') return ORDER_STATUS_QUERY_MAP['canceled'];
  return undefined;
};

export { createThumnbnailUrl, paging, getOrderStatusByQuery };

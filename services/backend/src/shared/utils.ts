import { filter, head, map, pipe } from '@fxts/core';
import CONFIG from './config';

const ORDER_STATUS_QUERY_MAP = {
  all: 'ALL',
  canceled: 'CANCELED',
} as const;

const CATEGORY_LIST = ['cloth', 'book', 'goods', 'food'] as const;

const CATEGORY_MAP = {
  goods: 1,
  cloth: 2,
  food: 3,
  book: 4,
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

const getCategoryIdByQuery = (query: string | undefined) => {
  return pipe(
    CATEGORY_LIST,
    filter((item) => item === query),
    map((item) => CATEGORY_MAP[item]),
    head,
  );
};

export { createThumnbnailUrl, paging, getOrderStatusByQuery, getCategoryIdByQuery };

import { html } from 'rune-ts';
import type { LayoutData } from '@rune-ts/server';
// @ts-ignore
import favicon from '../../public/favicon.png';
import type { CartCardData } from '../components';
import { ONBOARDING_DELIVERY_FEE_KR } from '../shared/constants';

enum CATEGORIES {
  GOODS = 'goods',
  CLOTH = 'cloth',
  FOOD = 'food',
  BOOK = 'book',
}

export const klasses = <T extends any>(...args: T[]) => html`${args.filter(Boolean).join(' ')}`;

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

export const getCategoryNameById = (category_id: 1 | 2 | 3 | 4) => {
  const hashMap = {
    1: CATEGORIES['GOODS'],
    2: CATEGORIES['CLOTH'],
    3: CATEGORIES['FOOD'],
    4: CATEGORIES['BOOK'],
  };
  return hashMap[category_id];
};

export const getOrderStatus = (order_status: string) => {
  const hashMap = {
    PENDING: '결제 확인 중',
    SUCCESS: '결제 완료',
    CANCELED: '취소 완료',
  };
  return hashMap[order_status];
};

export const getParamsFromUrl = () => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  const segments = window.location.pathname.split('/').filter(Boolean);
  return parseInt(`${segments[segments.length - 1]}`, 10);
};

export const getSearchQueryFromUrl = () => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  return Object.fromEntries(new URLSearchParams(location.search));
};

export const getDeliveryFee = (national: 'kr' = 'kr') => {
  const delivery_fee = {
    kr: ONBOARDING_DELIVERY_FEE_KR,
  };
  return delivery_fee[national];
};

export const createMetaData = (data: Partial<LayoutData>): LayoutData => {
  return {
    head: {
      title: data.head?.title ?? '',
      description: data.head?.title ?? '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
};

export const takeOne = <T>(iterable: Iterable<T>): T => {
  return iterable[Symbol.iterator]().next().value;
};

export const truncate = ({ string, limit, suffix }: { string: string; limit: number; suffix: string }) => {
  if (string.length > limit) return string.substring(0, limit) + suffix;

  return string;
};

export const createOrderName = (orderProductList: CartCardData[]) => {
  return orderProductList.length === 0
    ? ''
    : orderProductList.length === 1
      ? `${orderProductList[0]?.name}`
      : `${orderProductList[0]?.name} 외 ${orderProductList.length - 1}개`;
};

export const redirect = (url: string) => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  window.location.assign(url);
};

export const replace = (url: string) => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  window.location.replace(url);
};

export const reload = () => {
  if (typeof window === 'undefined') throw new Error('브라우저 환경에서만 사용해주세요.');
  // eslint-disable-next-line no-undef
  window.location.reload();
};

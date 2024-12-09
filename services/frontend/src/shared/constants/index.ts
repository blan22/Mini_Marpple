const ONBOARDING_BASE_URL = 'http://localhost:3000/@/order/complete';
const ONBOARDING_DELIVERY_FEE_KR = 3000;
// const SERVER_ENDPOINT = 'https://44c1-221-146-70-240.ngrok-free.app';
const SERVER_ENDPOINT = 'http://localhost:4000';
const SERVICE_ENV = 'development' as 'development' | 'production';
const PORTONE_API_SECRET = 'rezYGQMp2yjC52SRyGT8upsIL0g2HpirhCIUgktvweYnbzV8waWNO1ekVJDRzINaSuILGqwfjJF07pPM';
const PORTONE_CHANNEL_KEY = 'channel-key-7b3a2825-a7c9-4ea5-9bda-2efad4879bba';
const PORTONE_STORE_ID = 'store-113c0556-054f-4334-a140-e5ba2aa05281';

const ORDER_STATUS_LOWER_MAP = {
  ALL: 'all',
  CANCELED: 'canceled',
  PENDING: 'pending',
} as const;
const ORDER_STATUS_UPPER_MAP = {
  all: 'ALL',
  canceled: 'CANCELED',
  pending: 'PENDING',
} as const;
const CATEGORY_MAP = {
  all: '전체',
  cloth: '옷',
  goods: '굿즈',
  food: '음식',
  book: '책',
} as const;

export {
  SERVER_ENDPOINT,
  SERVICE_ENV,
  PORTONE_API_SECRET,
  PORTONE_CHANNEL_KEY,
  PORTONE_STORE_ID,
  ONBOARDING_DELIVERY_FEE_KR,
  ONBOARDING_BASE_URL,
  ORDER_STATUS_LOWER_MAP,
  ORDER_STATUS_UPPER_MAP,
  CATEGORY_MAP,
};

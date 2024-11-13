import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
  DOMAIN: process.env.DOMAIN,
  PORT: process.env.ONBOARDING_API_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  REDIS_ENDPOINT: process.env.REDIS_ENDPOINT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  SESSION_SECRET: `${process.env.SESSION_SECRET}`,
  PASSPORT_USERNAME_FIELD: 'email',
  PASSPORT_PASSWORD_FIELD: 'password',
} as const;

export default CONFIG;

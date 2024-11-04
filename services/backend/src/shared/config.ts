import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
  PORT: process.env.ONBOARDING_API_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_HOST,
} as const;

export default CONFIG;

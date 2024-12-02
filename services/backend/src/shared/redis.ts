import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import CONFIG from './config';
import { RequestHandler } from 'express-serve-static-core';
import { InternalServerError } from './error';

const client = createClient({
  url: `redis://${CONFIG.REDIS_ENDPOINT}`,
  password: CONFIG.REDIS_PASSWORD,
});

client.connect().catch(console.error);

const store = new RedisStore({ client });

const cacheKey = (req: Parameters<RequestHandler>[0]) => {
  return `${req.originalUrl}`;
};

const cacheMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const value = await client.get(cacheKey(req));
    if (value) res.status(200).json({ message: '캐시 히트', data: JSON.parse(value) });
    else next();
  } catch (error) {
    throw new InternalServerError();
  }
};

const writeCache = async <T>(key: string, data: T, ex: number = 86400) => {
  try {
    await client.setEx(key, ex, JSON.stringify(data));
  } catch (error) {
    throw new InternalServerError();
  }
};

export { store, cacheMiddleware, writeCache };

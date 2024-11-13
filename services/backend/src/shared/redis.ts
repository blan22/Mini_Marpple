import redis from 'redis';
import RedisStore from 'connect-redis';
import CONFIG from './config';

const client = redis.createClient({
  url: `redis://${CONFIG.REDIS_ENDPOINT}`,
  password: CONFIG.REDIS_PASSWORD,
});

const store = new RedisStore({ client });

export { store };

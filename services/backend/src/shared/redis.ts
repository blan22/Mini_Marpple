import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import CONFIG from './config';

const client = createClient({
  url: `redis://${CONFIG.REDIS_ENDPOINT}`,
  password: CONFIG.REDIS_PASSWORD,
});

client.connect().catch(console.error);

const store = new RedisStore({ client });

export { store };

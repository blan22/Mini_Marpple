// @ts-ignore
import { PostgreSQL } from 'fxsql/es';
import CONFIG from './config';

const { CONNECT } = PostgreSQL;

const POOL = CONNECT({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_DATABASE,
  charset: 'utf8',
});

export default POOL;

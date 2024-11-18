import type { Request } from 'express';
import { SERVER_ENDPOINT } from '../../../shared/constants';
import { get } from '../../fetcher';

const getSessionSS = (req: Request) => {
  const headers = new Headers();
  headers.set('cookie', `${req.get('cookie')}`);
  headers.set('Content-Type', 'application/json');
  return get(`${SERVER_ENDPOINT}/member`, { credentials: 'include', headers });
};

export { getSessionSS };

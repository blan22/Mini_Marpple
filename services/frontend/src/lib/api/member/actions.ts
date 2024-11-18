import { type Login } from '@monorepo/shared';
import { post } from '../../fetcher';
import { SERVER_ENDPOINT } from '../../../shared/constants';

const login = (data: Login) => {
  return post(`${SERVER_ENDPOINT}/member/login`, data, { credentials: 'include' });
};

export { login };

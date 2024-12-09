import { type Login } from '@monorepo/shared';
import { post } from '../../fetcher';

const login = (data: Login) => {
  return post(`/api/member/login`, data, { credentials: 'include' });
};

export { login };

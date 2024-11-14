import { type Login } from '@monorepo/shared';
import { post } from '../../fetcher';

const login = (data: Login) => {
  return post('http://localhost:4000/member/login', data, { credentials: 'include' });
};

export { login };

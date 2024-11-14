import { get } from '../../fetcher';

const getSession = () => {
  return get('http://localhost:4000/member', { credentials: 'include' });
};

export { getSession };

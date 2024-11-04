import { createRouter } from '@rune-ts/server';

export const ClientRouter = createRouter({
  ...(await import('../../pages/home/route')).homeRouter,
});

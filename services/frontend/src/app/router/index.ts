import { createRouter } from '@rune-ts/server';

export const ClientRouter = createRouter({
  ...(await import('../../pages/home/route')).homeRouter,
  ...(await import('../../pages/products/route')).productRouter,
  ...(await import('../../pages/admin/route')).adminRouter,
  ...(await import('../../pages/@/route')).userRouter,
  ...(await import('../../pages/login/route')).loginRouter,
  ...(await import('../../pages/error/route')).errorRouter,
});

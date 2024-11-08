import { AdminPage } from './page';
import { AdminProductCreatePage } from './create/page';

export const adminRouter = {
  ['/admin']: AdminPage,
  ['/admin/create']: AdminProductCreatePage,
  ['/admin/:id']: AdminProductCreatePage,
};

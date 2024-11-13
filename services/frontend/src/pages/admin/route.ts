import { AdminPage } from './page';
import { AdminProductCreatePage } from './create/page';
import { AdminProductUpdatePage } from './update/page';

export const adminRouter = {
  ['/admin']: AdminPage,
  ['/admin/create']: AdminProductCreatePage,
  ['/admin/:id']: AdminProductUpdatePage,
};

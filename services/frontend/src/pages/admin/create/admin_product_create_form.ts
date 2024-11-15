import { CreateProductSchema } from '@monorepo/shared';
import { AdminProductForm } from '../admin_product_form';
import { createProduct } from '../../../lib/api';
import type { HttpError } from '../../../lib/httpError';
import { toast } from '../../../components';
import { redirect } from '../../../lib/utils';

class AdminProductCreateForm extends AdminProductForm<typeof CreateProductSchema> {
  constructor(data) {
    super({ ...data }, CreateProductSchema);
  }

  override submit(data: any) {
    createProduct(data)
      .then(() => redirect('/admin'))
      .catch((error: HttpError) => toast.show(error.message, { variant: 'error' }));
  }
}

export { AdminProductCreateForm };

import { CreateProductSchema } from '@monorepo/shared';
import { AdminProductForm } from '../admin_product_form';
import { createProduct } from '../../../lib/api';

class AdminProductCreateForm extends AdminProductForm<typeof CreateProductSchema> {
  constructor(data) {
    super({ ...data }, CreateProductSchema);
  }

  override async submit(data: any) {
    await createProduct(data);
  }
}

export { AdminProductCreateForm };

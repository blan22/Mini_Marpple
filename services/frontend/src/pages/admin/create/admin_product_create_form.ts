import { CreateProductSchema } from '@monorepo/shared';
import { AdminProductForm } from '../admin_product_form';

class AdminProductCreateForm extends AdminProductForm<typeof CreateProductSchema> {
  constructor(data) {
    super({ ...data }, CreateProductSchema);
  }

  override submit(data: any) {
    console.log('create submit: ', data);
  }
}

export { AdminProductCreateForm };

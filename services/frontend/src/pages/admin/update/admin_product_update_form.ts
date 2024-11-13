import { UpdateProductSchema } from '@monorepo/shared';
import { AdminProductForm } from '../admin_product_form';
import { updateProduct } from '../../../lib/api';

class AdminProductUpdateForm extends AdminProductForm<typeof UpdateProductSchema> {
  constructor(data) {
    super({ ...data }, UpdateProductSchema);
  }

  override async submit(data) {
    console.log('update submit: ', data);
    // const result = await updateProduct()
  }
}

export { AdminProductUpdateForm };

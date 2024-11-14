import { UpdateProductSchema } from '@monorepo/shared';
import { AdminProductForm } from '../admin_product_form';
import { updateProduct } from '../../../lib/api';
import { getParamsFromUrl } from '../../../lib/utils';

class AdminProductUpdateForm extends AdminProductForm<typeof UpdateProductSchema> {
  constructor(data) {
    super({ ...data }, UpdateProductSchema);
  }

  override async submit(data) {
    const thumbnail_url = this._imageUploaderView.data.thumbnail instanceof File ? '' : this._thumbnailView.data.url;
    const result = await updateProduct(getParamsFromUrl(), { ...data, thumbnail_url });
  }
}

export { AdminProductUpdateForm };

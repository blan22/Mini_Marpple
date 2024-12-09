import { UpdateProductSchema } from '@monorepo/shared';
import { AdminProductForm } from '../admin_product_form';
import { updateProduct } from '../../../lib/api';
import { getParamsFromUrl } from '../../../lib/utils';
import type { HttpError } from '../../../lib/httpError';
import { toast } from '../../../components';

class AdminProductUpdateForm extends AdminProductForm<typeof UpdateProductSchema> {
  constructor(data) {
    super({ ...data }, UpdateProductSchema);
  }

  override submit(data) {
    const thumbnail_url = this._imageUploaderView.data.thumbnail instanceof File ? '' : this._thumbnailView.data.url;
    updateProduct(getParamsFromUrl(), { ...data, thumbnail_url })
      .then(() => toast.show('상품을 업데이트했습니다.', { variant: 'success' }))
      .catch((error: HttpError) => toast.show(error.message, { variant: 'error' }));
  }
}

export { AdminProductUpdateForm };

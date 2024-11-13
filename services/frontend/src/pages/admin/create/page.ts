import { html, Page } from 'rune-ts';

import { Layout, Header } from '../../../components';
import { AdminProductCreateForm } from './admin_product_create_form';
import type { ProductResponse } from '../../../types/product';

export class AdminProductCreatePage extends Page<ProductResponse> {
  override template() {
    return html`
      <div>
        ${new Layout(
          {
            content: new AdminProductCreateForm(this.data),
          },
          {
            header: new Header({}),
          },
        )}
      </div>
    `;
  }
}

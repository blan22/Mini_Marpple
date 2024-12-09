import { html, Page } from 'rune-ts';
import { Layout, Header } from '../../../components';
import type { AdminProductPageData } from '../../../types/product';
import { AdminProductUpdateForm } from './admin_product_update_form';

export class AdminProductUpdatePage extends Page<AdminProductPageData> {
  override template() {
    return html`
      <div>
        ${new Layout(
          {
            content: new AdminProductUpdateForm(this.data),
          },
          {
            header: new Header({ params: this.data.params }),
          },
        )}
      </div>
    `;
  }
}

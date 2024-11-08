import { html, Page } from 'rune-ts';

import { Layout, Header } from '../../../components';
import { AdminProductCreateForm } from './admin_product_create_form';

interface AdminProductCreatePageData {
  name: string | null;
  thumbnail: File | null;
  category: string | null;
  price: number | null;
  stock: number | null;
}

export class AdminProductCreatePage extends Page<AdminProductCreatePageData> {
  override template() {
    return html`
      <div>
        ${new Layout(
          {
            content: new AdminProductCreateForm({}),
          },
          {
            header: new Header({}),
          },
        )}
      </div>
    `;
  }
}

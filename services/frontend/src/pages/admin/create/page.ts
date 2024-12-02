import { html, Page } from 'rune-ts';
import { Layout, Header } from '../../../components';
import { AdminProductCreateForm } from './admin_product_create_form';

export class AdminProductCreatePage extends Page<{
  name: null;
  thumbnail: null;
  category: null;
  price: null;
  stock: null;
  params?: string;
}> {
  override template() {
    return html`
      <div>
        ${new Layout(
          {
            content: new AdminProductCreateForm(this.data),
          },
          {
            header: new Header({ params: this.data.params }),
          },
        )}
      </div>
    `;
  }
}

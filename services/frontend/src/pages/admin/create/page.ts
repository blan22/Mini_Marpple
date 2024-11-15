import { html, Page } from 'rune-ts';
import { Layout, Header } from '../../../components';
import { AdminProductCreateForm } from './admin_product_create_form';

export class AdminProductCreatePage extends Page<{}> {
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

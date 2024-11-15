import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, Thumbnail } from '../../../components';
import type { AdminProductPageData } from '../../../types/product';
import { ProductDetailForm } from './product_detail_form';

export class ProductDetailPage extends Page<AdminProductPageData> {
  override template(_) {
    return html`
      <div>
        ${new Layout(
          {
            content: html`
              <div class="${klass.container}">
                <div class="${klass.left}">${new Thumbnail({ url: this.data.thumbnailUrl })}</div>
                ${new ProductDetailForm(this.data)}
              </div>
            `,
          },
          {
            header: new Header({}),
          },
        )}
      </div>
    `;
  }
}

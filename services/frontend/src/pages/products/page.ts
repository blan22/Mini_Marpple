import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, ProductCardList } from '../../components';
import type { Product } from '@monorepo/shared';

interface ProductPageData {
  products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[];
}

export class ProductPage extends Page<ProductPageData> {
  override template(_) {
    return html`${new Layout(
      {
        content: html`<div class="${klass.container}">${new ProductCardList(this.data.products)}</div>`,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

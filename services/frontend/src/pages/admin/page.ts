import { html, Page } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import klass from './page.module.scss';
import { Layout, Header, Typography } from '../../components';
import { ProductCardList } from './product_card_list';

interface AdminPageData {
  products: (Omit<Product, 'thumbnail'> & { href: string })[];
}

export class AdminPage extends Page<AdminPageData> {
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

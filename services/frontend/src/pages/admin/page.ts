import { html, Page } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import klass from './page.module.scss';
import { Layout, Header, AdminProductCardList } from '../../components';

interface AdminPageData {
  products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[];
  params?: string;
}

export class AdminPage extends Page<AdminPageData> {
  override template() {
    return html`${new Layout(
      {
        content: html`<div class="${klass.container}">${new AdminProductCardList(this.data.products)}</div>`,
      },
      {
        header: new Header({ params: this.data.params }),
      },
    )}`;
  }
}

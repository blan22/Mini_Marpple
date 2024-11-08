import { html, ListView } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import { ProductCard } from '../../components/cell/card/product';
import { Typography } from '../../components';
import klass from './page.module.scss';

class ProductCardList extends ListView<Omit<Product, 'thumbnail'> & { href: string }, ProductCard> {
  override tagName = 'ul';
  override ItemView = ProductCard;

  override template() {
    return html`
      <${this.tagName}>
        <li class="${klass.create_product}">
          <a href="/admin/create">
            <div>${new Typography({ text: '+' }, { size: 'SIZE_24', color: 'WHITE', weight: 'MEDIUM', center: true })}</div>
            ${new Typography(
              { text: '상품 등록' },
              {
                size: 'SIZE_16',
                weight: 'MEDIUM',
                color: 'BLACK',
                center: true,
              },
            )}
          </a>
        </li>
        ${this.itemViews}
      </${this.tagName}>
    `;
  }
}

export { ProductCardList };

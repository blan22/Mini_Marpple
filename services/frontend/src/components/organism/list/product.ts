import { html, ListView } from 'rune-ts';
import { getCategoryNameById, type Product } from '@monorepo/shared';
import { ProductCard } from '../../cell';
import klass from './list.module.scss';
import type { getProductsByQuery } from '../../../lib/api';

class ProductCardList extends ListView<Omit<Product, 'thumbnail'> & { href: string; thumbnail: string }, ProductCard> {
  override tagName = 'ul';
  override ItemView = ProductCard;

  override template() {
    return html`
      <${this.tagName} class="${klass.product_list}">
        ${this.itemViews}
      </${this.tagName}>
    `;
  }

  update(data: Awaited<ReturnType<typeof getProductsByQuery>>['data']) {
    this.set(
      data.products?.map((product) => ({
        ...product,
        category: getCategoryNameById(product.category_id),
        href: `/product/${product.id}`,
      })),
    );
    this.redraw();
  }
}

export { ProductCardList };

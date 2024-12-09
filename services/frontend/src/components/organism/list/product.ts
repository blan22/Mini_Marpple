import { html, ListView } from 'rune-ts';
import { getCategoryNameById, type Product } from '@monorepo/shared';
import { ProductCard } from '../../cell';
import klass from './list.module.scss';
import type { getProductsByQuery } from '../../../lib/api';
import { Empty } from '../../cell/card/empty';

class ProductCardList extends ListView<Omit<Product, 'thumbnail'> & { href: string; thumbnail: string }, ProductCard> {
  override tagName = 'ul';
  override ItemView = ProductCard;
  private _emptyView = new Empty();

  override template() {
    return html`
      <${this.tagName} class="${klass.product_list}">
        ${this.itemViews.length ? this.itemViews : this._emptyView}
      </${this.tagName}>
    `;
  }

  update(data: Awaited<ReturnType<typeof getProductsByQuery>>['data']) {
    if (data.products.length) {
      this.set(
        data.products?.map((product) => ({
          ...product,
          category: getCategoryNameById(product.category_id),
          href: `/product/${product.id}`,
        })),
      );
    } else {
      this.reset();
      this.element().append(this._emptyView.render());
    }
  }
}

export { ProductCardList };

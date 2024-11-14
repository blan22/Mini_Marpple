import { html, ListView } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import { ProductCard } from '../../cell';

class ProductCardList extends ListView<Omit<Product, 'thumbnail'> & { href: string; thumbnail: string }, ProductCard> {
  override tagName = 'ul';
  override ItemView = ProductCard;

  override template() {
    return html`
      <${this.tagName}>
        ${this.itemViews}
      </${this.tagName}>
    `;
  }
}

export { ProductCardList };

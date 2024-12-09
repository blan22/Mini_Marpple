import { html, ListView } from 'rune-ts';
import { CartCard, type CartCardData } from '../../cell';
import klass from './list.module.scss';
import { Empty } from '../../cell/card/empty';

class CartCardList extends ListView<CartCardData, CartCard> {
  override tagName = 'ul';
  override ItemView = CartCard;
  private _emptyView = new Empty({ text: '카트 상품' });

  override template() {
    return html`
      <${this.tagName} class="${klass.cart_list}">
        ${this.itemViews.length ? this.itemViews : this._emptyView}
      </${this.tagName}>
    `;
  }
}

export { CartCardList };

import { html, ListView } from 'rune-ts';
import { CartCard, type CartCardData } from '../../cell';
import klass from './list.module.scss';

class CartCardList extends ListView<CartCardData, CartCard> {
  override tagName = 'ul';
  override ItemView = CartCard;

  override template() {
    return html`
      <${this.tagName} class="${klass.cart_list}">
        ${this.itemViews}
      </${this.tagName}>
    `;
  }
}

export { CartCardList };

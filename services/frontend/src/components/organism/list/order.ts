import { html, ListView } from 'rune-ts';
import { OrderCard } from '../../cell';
import type { Order } from '../../../types/order';
import klass from './product.module.scss';

class OrderCardList extends ListView<Order, OrderCard> {
  override tagName = 'ul';
  override ItemView = OrderCard;

  override template() {
    return html`
      <${this.tagName} class="${klass.order_list}">
        ${this.itemViews}
      </${this.tagName}>
    `;
  }
}

export { OrderCardList };

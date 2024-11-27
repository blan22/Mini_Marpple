import { html, ListView } from 'rune-ts';
import { OrderCard } from '../../cell';
import type { Order } from '../../../types/order';
import klass from './list.module.scss';
import type { getOrdersByQuery } from '../../../lib/api';
import { Empty } from '../../cell/card/empty';

class OrderCardList extends ListView<Order, OrderCard> {
  override tagName = 'ul';
  override ItemView = OrderCard;
  private _emptyView = new Empty();

  override template() {
    return html`
      <${this.tagName} class="${klass.order_list}">
        ${this.itemViews.length ? this.itemViews : this._emptyView}
      </${this.tagName}>
    `;
  }

  update(orders: Awaited<ReturnType<typeof getOrdersByQuery>>['data']['orders']) {
    if (orders.length) this.set(orders);
    else {
      this.reset();
      this.element().append(this._emptyView.render());
    }
  }
}

export { OrderCardList };

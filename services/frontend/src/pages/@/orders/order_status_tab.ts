import { html, ListView, on, View } from 'rune-ts';
import { Router } from '../../../lib/csr';
import klass from './page.module.scss';
import { each } from '@fxts/core';

export const ORDER_STATUS_TAB_MAP = {
  canceled: '취소완료',
  all: '전체',
};

interface OrderStatusTabData {
  title: string;
  status: string;
  query?: string;
}

class OrderStatusTabs extends ListView<OrderStatusTabData, OrderStatusTab> {
  override tagName = 'section';
  override ItemView = OrderStatusTab;

  override template() {
    return html`
      <${this.tagName}>
        ${this.itemViews}
      </${this.tagName}>
    `;
  }

  update(status: string | undefined) {
    each((itemView) => itemView.update(status), this.itemViews);
  }
}

class OrderStatusTab extends View<OrderStatusTabData> {
  protected override template() {
    return html`
      <button class="${this.data.status === this.data.query ? klass.order_status_tab_disabled : ''}">
        <h3>${this.data.title}</h3>
      </button>
    `;
  }

  @on('click')
  private _click() {
    Router.push(`${window.location.origin}/@/order?status=${this.data.status}`);
  }

  update(status: string | undefined) {
    if (this.data.status === status) this.disabled();
    else this.enabled();
  }

  enabled() {
    this.element().classList.remove(klass.order_status_tab_disabled);
  }

  disabled() {
    this.element().classList.add(klass.order_status_tab_disabled);
  }
}

export { OrderStatusTabs, OrderStatusTab };

import { html, ListView, on, View } from 'rune-ts';
import { Typography } from '../../../components';
import type { ORDER_STATUS_UPPER_MAP } from '../../../shared/constants';
import { Router } from '../../../lib/csr';

export const ORDER_STATUS_TAB_MAP = {
  canceled: '취소완료',
  all: '전체',
};

const getOrderStatusTabStyle = (
  status: OrderStatusTabData['currentStatus'],
  current: OrderStatusTabData['currentStatus'],
): Typography['options'] => {
  if (status === current) return { size: 'SIZE_16', color: 'BLACK', weight: 'BOLD', as: 'span' };
  return { size: 'SIZE_16', color: 'DIM_30', weight: 'BOLD', as: 'span' };
};

interface OrderStatusTabData {
  title: string;
  status: keyof typeof ORDER_STATUS_UPPER_MAP;
  currentStatus?: keyof typeof ORDER_STATUS_UPPER_MAP;
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
}

class OrderStatusTab extends View<OrderStatusTabData> {
  protected override template() {
    return html`
      <button>
        ${new Typography({ text: this.data.title }, getOrderStatusTabStyle(this.data.status, this.data.currentStatus))}
      </button>
    `;
  }

  @on('click')
  private _click() {
    Router.push(`${window.location.origin}/@/order`, { status: this.data.status });
  }
}

export { OrderStatusTabs, OrderStatusTab };

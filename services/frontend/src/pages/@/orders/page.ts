import { html, on } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, OrderCardList, Modal, CancelOrderEvent, ModalCancelEvent, toast } from '../../../components';
import type { Orders } from '../../../types/order';
import { OrderCancelForm } from './order_cancel_form';
import { find, pipe } from '@fxts/core';
import { PageWithCSR, type CsrHistoryEvent } from '../../../lib/csr';
import { Pagination } from '../../../components/cell/pagination';
import { OrderStatusTabs } from './order_status_tab';
import { ORDER_STATUS_LOWER_MAP, type ORDER_STATUS_UPPER_MAP } from '../../../shared/constants';
import { getOrdersByQuery } from '../../../lib/api';
import { getOrderStatusByLower } from '../../../lib/utils';

interface OrderPageData {
  orders: Orders;
  total: number;
  status?: keyof typeof ORDER_STATUS_UPPER_MAP;
  page: number;
}

export class OrderPage extends PageWithCSR<OrderPageData> {
  private _orderStatusTabsView: OrderStatusTabs;
  private _orderCardList: OrderCardList;
  private _modalView: Modal;

  constructor(data: OrderPageData) {
    super({ ...data });

    this._orderStatusTabsView = new OrderStatusTabs([
      { title: '전체', status: 'all', currentStatus: this.data.status ?? ORDER_STATUS_LOWER_MAP.ALL },
      { title: '취소완료', status: 'canceled', currentStatus: this.data.status ?? ORDER_STATUS_LOWER_MAP.ALL },
    ]);
    this._orderCardList = new OrderCardList(this.data.orders);
    this._modalView = new Modal();
  }

  override template() {
    return html`
      <div>
        ${new Layout(
          {
            content: html`
              <div class="${klass.container}">
                ${this._orderStatusTabsView} ${this._orderCardList} ${this._modalView}
                ${new Pagination({ limit: 10, length: this.data.total, page: this.data.page })}
              </div>
            `,
          },
          {
            header: new Header({}),
          },
        )}
      </div>
    `;
  }

  @on(ModalCancelEvent)
  _clickModalOutside(e: ModalCancelEvent<string | undefined>) {
    if (e.detail)
      pipe(
        this._orderCardList._itemViews,
        find((item) => item.data.payment_id === e.detail),
        (item) => item?.cancel(),
      );
    this._modalView.close();
  }

  @on(CancelOrderEvent)
  _clickQuantityUpdateButton(e: CancelOrderEvent) {
    this._modalView.open(new OrderCancelForm(e.detail));
  }

  // @todo: 로딩창
  protected override onCsrStart(): void {}
  protected override onCsrEnd(): void {}

  // @refactor: 탭 컨텐츠 변경 onCsrStart로
  protected override async historyEvent<T>(e: CsrHistoryEvent<T>) {
    const { page = '1', status = ORDER_STATUS_LOWER_MAP.ALL } = e.query;
    const result = await getOrdersByQuery({ page: parseInt(page), status: getOrderStatusByLower(status), limit: 10 });
    this._update(result.data, status);
  }

  private _update(data: Awaited<ReturnType<typeof getOrdersByQuery>>['data'], status: string) {
    this.data.status = getOrderStatusByLower(status);
    this.data.total = data.total;
    this.data.orders = data.orders;
    this._orderStatusTabsView.set([
      { title: '전체', status: 'all', currentStatus: this.data.status },
      { title: '취소완료', status: 'canceled', currentStatus: this.data.status },
    ]);
    this._orderStatusTabsView.redraw();
    this._orderCardList.set(this.data.orders);
    this._orderCardList.redraw();
  }
}

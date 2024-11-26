import { html, on } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, OrderCardList, Modal, CancelOrderEvent, ModalCancelEvent, Loading } from '../../../components';
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
  private _paginationView: Pagination;

  constructor(data: OrderPageData) {
    super({ ...data });

    this._orderStatusTabsView = new OrderStatusTabs([
      { title: '전체', status: 'all', query: this.data.status ?? ORDER_STATUS_LOWER_MAP.ALL },
      { title: '취소완료', status: 'canceled', query: this.data.status ?? ORDER_STATUS_LOWER_MAP.ALL },
    ]);
    this._orderCardList = new OrderCardList(this.data.orders);
    this._paginationView = new Pagination({ limit: 10, length: this.data.total, page: this.data.page });
    this._modalView = new Modal();
  }

  override template() {
    return html`
      <div class="${klass.page}">
        ${new Layout(
          {
            content: html`
              <div class="${klass.container}">
                ${this._orderStatusTabsView} ${this._orderCardList} ${this._modalView}
              </div>
            `,
          },
          {
            header: new Header({}),
            footer: this._paginationView,
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
  protected override onCsrStart(): void {
    Loading.start();
  }
  protected override onCsrEnd(): void {
    Loading.end();
  }

  // @refactor: 탭 컨텐츠 변경 onCsrStart로
  protected override async historyEvent<T>(e: CsrHistoryEvent<T>) {
    const { page = '1', status = ORDER_STATUS_LOWER_MAP.ALL } = e.query;
    const result = await getOrdersByQuery({ page: parseInt(page), status: getOrderStatusByLower(status), limit: 10 });
    this._orderCardList.update(result.data.orders);
    this._paginationView.update({ page: parseInt(page), length: result.data.total, limit: 10 });
    this._orderStatusTabsView.update(getOrderStatusByLower(status));
  }
}

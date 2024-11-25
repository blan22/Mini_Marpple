import { html, on } from 'rune-ts';
import klass from './page.module.scss';
import {
  Layout,
  Header,
  Typography,
  OrderCardList,
  Modal,
  CancelOrderEvent,
  ModalCancelEvent,
} from '../../../components';
import type { Orders } from '../../../types/order';
import { OrderCancelForm } from './order_cancel_form';
import { find, pipe } from '@fxts/core';
import { PageWithCSR, type CsrHistoryEvent } from '../../../lib/csr';
import { Pagination } from '../../../components/cell/pagination';
import type { Order } from '@monorepo/shared';

interface OrderPageData {
  orders: Orders;
  status?: Order['status'];
  page?: number;
}

export class OrderPage extends PageWithCSR<OrderPageData> {
  private _orderCardList: OrderCardList;
  private _modalView: Modal;

  constructor(data: OrderPageData) {
    super({ ...data });

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
                <section>
                  ${new Typography({ text: '전체' }, { size: 'SIZE_16', color: 'BLACK', weight: 'BOLD' })}
                  ${new Typography({ text: '취소완료' }, { size: 'SIZE_16', color: 'BLACK', weight: 'BOLD' })}
                </section>
                ${this._orderCardList} ${this._modalView} ${new Pagination({ length: 20, limit: 10, page: 3 })}
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

  protected override onCsrStart(): void {}

  protected override onCsrEnd(): void {}

  protected override historyEvent<T>(e: CsrHistoryEvent<T>): void {
    console.log(e.query);
  }
}

import { html, Page, View, type Html } from 'rune-ts';
import klass from './page.module.scss';
import { Header, Layout } from '../../../../components';
import type { Order } from '@monorepo/shared';
import { OrderSucess } from './order_success';
import { NotAccess } from './not_acess';

interface OrderCompletePageData {
  order: Order | null;
}

class OrderCompletePage extends Page<OrderCompletePageData> {
  private _content: View | Html;

  constructor(data: OrderCompletePageData) {
    super({ ...data });

    this._content = this.data.order ? new OrderSucess(this.data.order) : new NotAccess({});
  }

  override template() {
    return html`
      <div class="${klass.container}">
        ${new Layout(
          {
            content: html`<div class="${klass.container}">${this._content}</div> `,
          },
          {
            header: new Header({}),
          },
        )}
      </div>
    `;
  }
}

export { OrderCompletePage };

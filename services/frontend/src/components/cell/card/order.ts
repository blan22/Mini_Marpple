import { CustomEventWithDetail, html, on, View } from 'rune-ts';
import { Button, Divider, Typography } from '../../atom';
import klass from './card.module.scss';
import type { Order } from '../../../types/order';
import dayjs from 'dayjs';
import { getOrderStatus } from '../../../lib/utils';
import { pipe } from '@fxts/core';

export class CancelOrderEvent extends CustomEventWithDetail<Order> {}

const STATUS_BUTTON_MAP = {
  CANCELED: new Button({ text: '취소 완료' }, { type: 'reset', variant: 'line', disabled: true }),
};

const getButtonByStatus = (status: Order['status']) => {
  return STATUS_BUTTON_MAP[status]
    ? STATUS_BUTTON_MAP[status]
    : new Button({ text: '취소' }, { type: 'reset', variant: 'line' });
};

class OrderCard extends View<Order> {
  private _buttonView: Button;
  private _statusView: Typography;

  constructor(data: Order) {
    super({ ...data });

    this._buttonView = getButtonByStatus(this.data.status);
    this._statusView = new Typography({ text: getOrderStatus(this.data.status) }, { size: 'SIZE_14', weight: 'BOLD' });
  }

  override template() {
    return html`
      <li class="${klass.order_card}">
        ${new Typography(
          { text: dayjs(this.data.create_at).format('YYYY.MM.DD HH:mm') },
          { size: 'SIZE_14', color: 'DIM_60', weight: 'BOLD' },
        )}
        ${new Divider({})}
        <div class="${klass.order_card_content}">
          <div class="${klass.order_card_content_detail}">
            ${new Typography({ text: this.data.name }, { size: 'SIZE_20', weight: 'REGULAR' })}
            ${new Typography(
              { text: `${parseInt(this.data.total_price).toLocaleString('ko-kr')} 원` },
              { size: 'SIZE_16', weight: 'BOLD' },
            )}
          </div>
          <div>${this._statusView}</div>
          <div>${this._buttonView}</div>
        </div>
      </li>
    `;
  }

  @on('click', 'button[type=reset]')
  private _cancelOrderEvent() {
    this.dispatchEvent(CancelOrderEvent, { bubbles: true, detail: this.data });
  }

  cancel() {
    pipe(this.subView(Button), (item) => {
      if (item) {
        item.element().setAttribute('disabled', 'true');
        item.element().textContent = getOrderStatus('CANCELED');
        this._statusView.element().textContent = getOrderStatus('CANCELED');
      }
    });
  }
}

export { OrderCard };

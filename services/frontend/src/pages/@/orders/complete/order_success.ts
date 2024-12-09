import { html, View, on } from 'rune-ts';
import { Button, Divider, Typography } from '../../../../components';
import klass from './page.module.scss';
import type { Order } from '@monorepo/shared';
import dayjs from 'dayjs';
import { replace } from '../../../../lib/utils';

class OrderSucess extends View<Order> {
  override template() {
    return html`
      <section class="${klass.order_success}">
        <div>
          ${new Typography(
            { text: dayjs(this.data.create_at).format('YYYY.MM.DD HH:mm') },
            { size: 'SIZE_16', color: 'DIM_60', weight: 'MEDIUM' },
          )}
          ${new Typography({ text: '주문이 완료되었습니다.' }, { size: 'SIZE_24', weight: 'BOLD' })}
        </div>
        ${new Divider({})}
        <div>
          ${new Typography({ text: this.data.name }, { size: 'SIZE_20', color: 'DIM_60', weight: 'MEDIUM' })}
          ${new Typography(
            { text: `${parseInt(this.data.total_price as any).toLocaleString('ko-kr')} 원` },
            { size: 'SIZE_20', weight: 'BOLD' },
          )}
        </div>
        ${new Divider({})}
        <div>${new Button({ text: '구매내역' }, { type: 'button', variant: 'line' })}</div>
      </section>
    `;
  }

  @on('click', 'button')
  _click() {
    replace('/@/order');
  }
}

export { OrderSucess };

import { CancelOrderSchema, type CancelOrder, type Order } from '@monorepo/shared';
import { html, on } from 'rune-ts';
import {
  Button,
  Divider,
  Form,
  FormController,
  ModalCancelEvent,
  Select,
  toast,
  Typography,
} from '../../../components';
import klass from './page.module.scss';
import { cancelOrder } from '../../../lib/api';
import type { HttpError } from '../../../lib/httpError';

class OrderCancelForm extends Form<Order> {
  private _formController: FormController;

  constructor(data: Order) {
    super({ ...data });

    this._formController = new FormController(this, CancelOrderSchema.omit({ payment_id: true }));
  }

  override template() {
    return html`
      <form class="${klass.order_cancel_form}">
        <div class="${klass.order_cancel_form_title}">
          ${new Typography({ text: this.data.name }, { size: 'SIZE_20', weight: 'MEDIUM', as: 'h2' })}
          ${new Typography({ text: '결제 취소하시겠어요?' }, { size: 'SIZE_14', weight: 'REGULAR', as: 'span' })}
        </div>
        ${new Divider({})}
        <div class="${klass.order_cancel_form_select}">
          ${new Select(
            {
              options: [
                { name: '단순변심', value: '단순변심' },
                { name: '상품불량', value: '상품불량' },
                { name: '상품정보와 상이', value: '상품정보와 상이' },
              ],
            },
            { name: 'reason' },
          )}
        </div>
        ${new Divider({})}
        <div class="${klass.order_cancel_form_buttons}">
          ${new Button({ text: '취소' }, { type: 'reset', variant: 'line' })}
          ${new Button({ text: '변경' }, { type: 'submit', variant: 'primary' })}
        </div>
      </form>
    `;
  }

  @on('click', 'button[type=reset]')
  __click() {
    this.dispatchEvent(ModalCancelEvent, { bubbles: true, detail: {} });
  }

  override submit(data: Omit<CancelOrder, 'payment_id'>) {
    // @todo: 상품 취소하고 뷰 optimistic update를 해야함
    cancelOrder({ ...data, payment_id: this.data.payment_id })
      .then(() => this.dispatchEvent(ModalCancelEvent, { bubbles: true, detail: this.data.payment_id }))
      .catch((error: HttpError) => toast.show(error.message, { variant: 'error' }));
  }
}

export { OrderCancelForm };

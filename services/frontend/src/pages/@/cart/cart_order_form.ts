import {
  Button,
  Checkbox,
  Form,
  FormController,
  FormValidationErrorEvent,
  Radio,
  toast,
  Typography,
} from '../../../components';
import { html, on } from 'rune-ts';
import klass from './page.module.scss';
import { OrderSchema, type Order } from '@monorepo/shared';
import { requestPayment } from '../../../lib/api';
import { v4 } from 'uuid';

class CartOrderForm extends Form {
  private _formController: FormController;

  constructor(data = {}) {
    super({ ...data });

    this._formController = new FormController(this, OrderSchema);
  }

  override template() {
    return html`
      <form class="${klass.cart_order_form}">
        <div class="${klass.cart_order_form_payment_list}">
          ${new Radio({ value: 'CARD', title: '카드' }, { name: 'pay_method' })}
          ${new Radio({ value: 'etc', title: '가상계좌(무통장)' }, { name: 'pay_method' })}
        </div>
        <div>
          ${new Checkbox({ name: 'agree' })}
          ${new Typography({ text: '(필수)' }, { size: 'SIZE_14', weight: 'BOLD', as: 'span' })}
          ${new Typography(
            { text: '주문 내용 및 위의 내용을 모두 확인하였으며, 결제에 동의합니다.' },
            { size: 'SIZE_14', weight: 'MEDIUM', as: 'span' },
          )}
        </div>
        <div>${new Button({ text: '주문하기' }, { type: 'submit', variant: 'primary' })}</div>
      </form>
    `;
  }

  @on(FormValidationErrorEvent)
  onFormValidationError(e: FormValidationErrorEvent) {
    console.log(e);
  }

  override submit(data: Order) {
    requestPayment(v4(), data.pay_method)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        toast.show(error?.messsage ?? '에러가 발생했습니다.', { variant: 'error' });
      });
  }
}

export { CartOrderForm };

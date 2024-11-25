import { html, on } from 'rune-ts';
import { CreateOrderSchema, type CreateOrder } from '@monorepo/shared';
import {
  Button,
  Checkbox,
  Form,
  FormController,
  FormValidationErrorEvent,
  Radio,
  toast,
  Typography,
  type CartCardData,
} from '../../../components';
import klass from './page.module.scss';
import { requestPayment } from '../../../lib/api';
import { v4 } from 'uuid';
import { createOrderName, getDeliveryFee, redirect } from '../../../lib/utils';
import { reduce } from '@fxts/core';

interface CartOrderFormData {
  cart: CartCardData[];
  cart_id: number;
  user_id: number;
}
class CartOrderForm extends Form<CartOrderFormData> {
  private _formController: FormController;

  constructor(data: CartOrderFormData) {
    super({ ...data });

    this._formController = new FormController(this, CreateOrderSchema);
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
    toast.show(e.detail, { variant: 'error' });
  }

  updateCart(cart: CartOrderFormData['cart']) {
    this.data.cart = cart;
  }

  override submit(data: CreateOrder) {
    if (!this.data.cart.length) {
      toast.show('상품을 카트에 담아주세요.', { variant: 'error' });
      return;
    }

    requestPayment({
      paymentId: v4(),
      payMethod: data.pay_method,
      orderName: createOrderName(this.data.cart),
      totalAmount: reduce(
        (total, item) => total + parseInt(item.price) * item.quantity,
        getDeliveryFee(),
        this.data.cart,
      ),
      userId: this.data.user_id,
    })
      .then((result) => {
        // @todo: 결제 취소 케이스 처리 -> 삭제?
        if (result?.code === 'FAILURE_TYPE_PG') {
        } else redirect(`/@/order/complete?paymentId=${result?.paymentId}`);
      })
      .catch((error) => toast.show(error?.messsage ?? '에러가 발생했습니다.', { variant: 'error' }));
  }
}

export { CartOrderForm };

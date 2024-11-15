import {
  Button,
  type CartCardData,
  Divider,
  Form,
  FormController,
  ModalCancelEvent,
  ProductCard,
  Range,
  toast,
  Typography,
} from '../../../components';
import { type CartProductQuantityUpdate, CartProductQuantityUpdateSchema } from '@monorepo/shared';
import { html, on } from 'rune-ts';
import klass from './page.module.scss';
import { updateCartQuantity } from '../../../lib/api';
import type { HttpError } from '../../../lib/httpError';

class CartItemQuantityUpdateForm extends Form<CartCardData> {
  private _formController: FormController;
  private _totalQuantityView: Typography;
  private _totalPriceView: Typography;

  constructor(data: CartCardData) {
    super({ ...data });

    this._totalQuantityView = new Typography(
      { text: `총 ${this.data.quantity}개의 상품 금액` },
      { size: 'SIZE_16', weight: 'BOLD', as: 'span' },
    );
    this._totalPriceView = new Typography(
      { text: `${(this.data.quantity * parseInt(this.data.price)).toLocaleString('ko-kr')}원` },
      { size: 'SIZE_20', weight: 'BOLD', as: 'h3' },
    );
    this._formController = new FormController(this, CartProductQuantityUpdateSchema);
  }

  override template() {
    return html`
      <form class="${klass.cart_item_quantity_update_form}">
        ${new Typography({ text: '수량 변경' }, { size: 'SIZE_20', as: 'h2', weight: 'MEDIUM' })} ${new Divider({})}
        <div class="${klass.cart_item_quantity_update_form_card}">
          ${new ProductCard(this.data, { tagName: 'div' })}
        </div>
        <div class="${klass.cart_item_quantity_update_form_detail}">
          ${new Typography({ text: '수량' }, { size: 'SIZE_16', weight: 'MEDIUM', as: 'span' })}
          ${new Range({}, { name: 'quantity', min: 1, max: this.data.stock, defaultValue: this.data.quantity })}
        </div>
        <div class="${klass.cart_item_quantity_update_form_detail}">
          ${this._totalQuantityView} ${this._totalPriceView}
        </div>
        <div class="${klass.cart_item_quantity_update_form_buttons}">
          ${new Button({ text: '취소' }, { type: 'reset', variant: 'line' })}
          ${new Button({ text: '변경' }, { type: 'submit', variant: 'primary' })}
        </div>
      </form>
    `;
  }

  @on('change', '.Range')
  _onChange() {
    const input = this.element().querySelector('input')!;
    this._updateQuantity(parseInt(input.value, 10));
  }

  @on('click', 'button[type=reset]')
  _click() {
    this.dispatchEvent(ModalCancelEvent, { bubbles: true, detail: {} });
  }

  _updateQuantity(quantity: number) {
    this.data.quantity = quantity;
    this._totalQuantityView.element().textContent = `총 ${this.data.quantity}개의 상품 금액`;
    this._totalPriceView.element().textContent = `${(this.data.quantity * parseInt(this.data.price)).toLocaleString('ko-kr')}원`;
  }

  override submit(data: CartProductQuantityUpdate) {
    updateCartQuantity(this.data.cart_product_item_id, data)
      .then(() => {
        this.dispatchEvent(ModalCancelEvent, {
          bubbles: true,
          detail: { ...data, cartProductItemId: this.data.cart_product_item_id },
        });
      })
      .catch((error: HttpError) => toast.show(error.message, { variant: 'error' }));
  }
}

export { CartItemQuantityUpdateForm };

import { CustomEventWithDetail, html, on, View } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import { ProductCard } from './product';
import { Button, Typography } from '../../atom';
import klass from './card.module.scss';

export interface CartCardData extends Product {
  cart_product_item_id: number;
  href: string;
  quantity: number;
}

export class QuantityUpdateEvent extends CustomEventWithDetail<CartCardData> {}

export class CartProductDeleteEvent extends CustomEventWithDetail<{ cartProductItemId: number }> {}

class CartCard extends View<CartCardData> {
  private _totalQuantityView: Typography;
  private _totalPriceView: Typography;

  constructor(data: CartCardData) {
    super({ ...data });

    this._totalQuantityView = new Typography(
      { text: `수량 / ${this.data.quantity}개` },
      { size: 'SIZE_16', weight: 'BOLD', as: 'span' },
    );
    this._totalPriceView = new Typography(
      { text: `${(this.data.quantity * parseInt(this.data.price)).toLocaleString('ko-kr')}원` },
      { size: 'SIZE_20', weight: 'BOLD', as: 'h3' },
    );
  }

  override template() {
    return html`
      <li class="${klass.cart_card}">
        <div class="${klass.cart_card_wrapper}">
          <div class="${klass.cart_card_content}">${new ProductCard(this.data, { tagName: 'div' })}</div>
          <div class="${klass.cart_card_action}">
            <div>
              <div>${new Button({ text: '✕' }, { variant: 'none', type: 'reset' })}</div>
            </div>
            ${new Button({ text: '수량 변경' }, { variant: 'line' })}
          </div>
        </div>
        <div class="${klass.cart_card_detail}">
          ${new Typography(
            { text: `수량 / ${this.data.quantity}개` },
            {
              size: 'SIZE_14',
              color: 'BLACK',
              weight: 'REGULAR',
              as: 'span',
            },
          )}
          ${new Typography(
            { text: `${(parseInt(this.data.price) * this.data.quantity).toLocaleString('kr-ko')}원` },
            {
              size: 'SIZE_14',
              color: 'BLACK',
              weight: 'BOLD',
              as: 'span',
            },
          )}
        </div>
      </li>
    `;
  }

  @on('click', 'button[type=button]')
  _updateQuantityEvent() {
    this.dispatchEvent(QuantityUpdateEvent, { detail: { ...this.data }, bubbles: true });
  }

  @on('click', 'button[type=reset]')
  _deleteCartProductEvent() {
    this.dispatchEvent(CartProductDeleteEvent, {
      detail: { cartProductItemId: this.data.cart_product_item_id },
      bubbles: true,
    });
  }

  updateQuantityView(quantity: number) {
    this.data.quantity = quantity;
    this._totalQuantityView.element().textContent = `총 ${this.data.quantity}개의 상품 금액`;
    this._totalPriceView.element().textContent = `${(this.data.quantity * parseInt(this.data.price)).toLocaleString('ko-kr')}원`;
  }
}

export { CartCard };

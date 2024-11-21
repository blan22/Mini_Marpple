import { html, on, Page } from 'rune-ts';
import { each, filter, pipe } from '@fxts/core';
import klass from './page.module.scss';
import {
  Layout,
  Header,
  Button,
  Typography,
  Divider,
  Modal,
  ModalCancelEvent,
  QuantityUpdateEvent,
  CartProductDeleteEvent,
  CartCardList,
  toast,
} from '../../../components';
import { deleteCartProduct, getCart } from '../../../lib/api';
import { CartItemQuantityUpdateForm } from './cart_item_quantity_update_form';
import type { HttpError } from '../../../lib/httpError';
import { CartOrderForm } from './cart_order_form';

export interface CardPageData {
  cart: Awaited<ReturnType<typeof getCart>>['data'];
}

export class CartPage extends Page<CardPageData> {
  private _totalQuantityView: Typography;
  private _totalPriceView: Typography;
  private _modalView: Modal;
  private _cartCardList: CartCardList;
  private _cartOrderFormView: CartOrderForm;

  constructor(data: CardPageData) {
    super({ ...data });

    this._cartCardList = new CartCardList(
      this.data.cart.cart_product_items.map((item) => ({
        ...item.product,
        cart_product_item_id: item.id,
        quantity: item.quantity,
        href: `/product/${item.product.id}`,
      })),
    );

    const { quantity: totalQuantity, price: totalPrice } = this._total();

    this._modalView = new Modal();
    this._cartOrderFormView = new CartOrderForm({
      cart: this._cartCardList.data,
      cart_id: this.data.cart.id,
      user_id: this.data.cart.user_id,
    });
    this._totalQuantityView = new Typography(
      { text: `${totalQuantity}개` },
      { size: 'SIZE_12', weight: 'BOLD', as: 'span' },
    );
    this._totalPriceView = new Typography({ text: `${totalPrice}원` }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' });
  }
  override template(_) {
    return html`
      <div>
        ${new Layout(
          {
            content: html`
              <div class="${klass.container}">
                ${this._cartCardList}
                <section class="${klass.cart_content}">
                  <div>${new Typography({ text: '주문정보' }, { size: 'SIZE_16', weight: 'BOLD' })}</div>
                  ${new Divider({})}
                  <ul>
                    <li>
                      ${new Typography({ text: '총 수량' }, { size: 'SIZE_12', weight: 'REGULAR', as: 'span' })}
                      ${this._totalQuantityView}
                    </li>
                    <li>
                      ${new Typography({ text: '총 상품금액' }, { size: 'SIZE_12', weight: 'REGULAR', as: 'span' })}
                      ${this._totalPriceView}
                    </li>
                    <li>
                      ${new Typography({ text: '총 배송비' }, { size: 'SIZE_12', weight: 'REGULAR', as: 'span' })}
                      ${new Typography({ text: '3,000원' }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' })}
                    </li>
                  </ul>
                  ${new Divider({ style: 'DOTTED' })} ${this._cartOrderFormView}
                </section>
                ${this._modalView}
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
  _clickModalOutside(e: ModalCancelEvent<{ quantity?: number; cartProductItemId?: number }>) {
    if (e.detail?.cartProductItemId && e.detail?.quantity) {
      this._updateCartProductQuantity(e.detail.cartProductItemId, e.detail.quantity);
      this._updateCartProductTotal();
      this._cartOrderFormView.updateCart(this._cartCardList.itemViews.map((view) => view.data));
    }
    this._modalView.close();
  }

  @on(QuantityUpdateEvent)
  _clickQuantityUpdateButton(e: QuantityUpdateEvent) {
    this._modalView.open(new CartItemQuantityUpdateForm(e.detail));
  }

  @on(CartProductDeleteEvent)
  _clickCartProductDeleteButton(e: CartProductDeleteEvent) {
    deleteCartProduct(e.detail.cartProductItemId)
      .then(() => {
        this._cartCardList.removeBy((item) => item.data.cart_product_item_id === e.detail.cartProductItemId);
        this._cartCardList.redraw();
        this._cartOrderFormView.updateCart(this._cartCardList.data);
        this._updateCartProductTotal();
      })
      .catch((error: HttpError) => toast.show(error.message, { variant: 'error' }));
  }

  _total() {
    return pipe(this._cartCardList.itemViews, (views) =>
      views.reduce(
        (total, view) => ({
          quantity: total.quantity + view.data.quantity,
          price: total.price + parseInt(view.data.price) * view.data.quantity,
        }),
        { quantity: 0, price: 0 },
      ),
    );
  }

  _updateCartProductQuantity(id: number, quantity: number) {
    pipe(
      this._cartCardList.itemViews,
      filter((view) => view.data.cart_product_item_id === id),
      each((view) => {
        view.data.quantity = quantity;
        view.redraw();
      }),
    );
  }

  _updateCartProductTotal() {
    const { quantity: totalQuantity, price: totalPrice } = this._total();
    this._totalQuantityView.element().textContent = `${totalQuantity}개`;
    this._totalPriceView.element().textContent = `${totalPrice.toLocaleString('ko-kr')}원`;
  }
}

// 1. 주문하기 버튼을 누를 때, 주문 상태 테이블을 생성/갱신한다 상태는 pending
// 2. pg 결제창에서 결제가 완료되었다면 웹훅 수신 대기
// 3. 서버 웹훅 라우트에서 수신이 왔다면 검증 처리

// delete 할 때도 뷰 업데이트 필요

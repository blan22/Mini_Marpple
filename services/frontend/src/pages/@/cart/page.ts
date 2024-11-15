import { html, on, Page } from 'rune-ts';
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
} from '../../../components';
import { getCart } from '../../../lib/api';
import { CartItemQuantityUpdateForm } from './cart_item_quantity_update_form';
import { each, filter, pipe, reduce } from '@fxts/core';

export interface CardPageData {
  cart: Awaited<ReturnType<typeof getCart>>['data'] | null;
}

export class CartPage extends Page<CardPageData> {
  private _totalQuantityView: Typography;
  private _totalPriceView: Typography;
  private _modalView: Modal;
  private _cartCardList: CartCardList;

  constructor(data: CardPageData) {
    super({ ...data });

    this._totalQuantityView = new Typography({ text: `0개` }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' });
    this._totalPriceView = new Typography({ text: `0원` }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' });
    this._cartCardList = new CartCardList([]);
    this._modalView = new Modal();
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
                  ${new Divider({ style: 'DOTTED' })} ${new Button({ text: '주문서 작성' })}
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
    }
    this._modalView.close();
  }

  @on(QuantityUpdateEvent)
  _clickQuantityUpdateButton(e: QuantityUpdateEvent) {
    this._modalView.open(new CartItemQuantityUpdateForm(e.detail));
  }

  @on(CartProductDeleteEvent)
  _clickCartProductDeleteButton(e: CartProductDeleteEvent) {
    console.log(e);
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

  override async onRender() {
    const cart = await getCart();
    this._cartCardList.add(
      cart.data.cart_product_items.map((item) => ({
        ...item.product,
        cart_product_item_id: item.id,
        quantity: item.quantity,
        href: `/product/${item.product.id}`,
      })),
    );
    this._cartCardList.redraw();
    this._updateCartProductTotal();
  }
}

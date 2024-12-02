import { html } from 'rune-ts';
import { CartProcessSchema } from '@monorepo/shared';
import klass from './page.module.scss';
import { Button, Form, Typography, Range, FormController, toast } from '../../../components';
import type { AdminProductPageData } from '../../../types/product';
import { addToCart } from '../../../lib/api';
import { getParamsFromUrl } from '../../../lib/utils';

class ProductDetailForm extends Form<AdminProductPageData> {
  private _formController: FormController;

  constructor(data: AdminProductPageData) {
    super({ ...data });

    this._formController = new FormController(this, CartProcessSchema);
  }

  get isNotSoldOut() {
    return Boolean(this.data.stock);
  }

  override template() {
    return html`
      <form class="${klass.right}">
        ${new Typography(
          { text: this.data.category },
          { size: 'SIZE_14', weight: 'BOLD', as: 'span', color: 'DIM_60' },
        )}
        ${new Typography({ text: this.data.name }, { size: 'SIZE_24', as: 'h2', weight: 'MEDIUM' })}
        ${new Typography(
          { text: `${parseInt(this.data.price).toLocaleString('ko-kr')}원` },
          { size: 'SIZE_16', as: 'h3', weight: 'BOLD' },
        )}
        <div class="${klass.stock}">
          ${new Typography({ text: '수량' })}
          ${this.isNotSoldOut
            ? new Range({}, { name: 'stock', required: true, min: 1, max: this.data.stock, defaultValue: 1 })
            : new Typography({ text: '품절' })}
        </div>
        <div class="${klass.sold_out}">
          ${new Typography({ text: '재고' }, { size: 'SIZE_12', color: 'GRAY_50', weight: 'MEDIUM', as: 'span' })}
          ${new Typography(
            { text: `${this.data.stock}` },
            { size: 'SIZE_12', color: 'GRAY_50', weight: 'MEDIUM', as: 'span' },
          )}
        </div>
        ${new Button({ text: '장바구니' }, { type: 'submit', variant: 'primary', disabled: !this.isNotSoldOut })}
      </form>
    `;
  }

  override submit(data) {
    addToCart(getParamsFromUrl(), data)
      .then(() => {
        toast.show('장바구니에에 담았습니다.', { variant: 'success' });
      })
      .catch(() => {
        toast.show('장바구니에에 담기에 실패했습니다.', { variant: 'error' });
      });
  }
}

export { ProductDetailForm };

import { html } from 'rune-ts';
import shared from '@monorepo/shared';
import klass from './page.module.scss';
import { Button, Form, Typography, Range, FormController } from '../../../components';
import type { AdminProductPageData } from '../../../types/product';

class ProductDetailForm extends Form<AdminProductPageData> {
  private _formController: FormController;

  constructor(data: AdminProductPageData) {
    super({ ...data });

    // this
  }

  get isNotSoldOut() {
    return Boolean(this.data.stock);
  }

  override template() {
    return html`
      <form class="${klass.right}">
        ${new Typography(
          { text: shared.getCategoryNameById(this.data.category_id) },
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
            ? new Range(
                {},
                { name: 'stock', require: true, min: 1, max: this.data.stock, defaultValue: this.data.stock ?? 0 },
              )
            : new Typography({ text: '품절' })}
        </div>
        ${new Button({ text: '장바구니' }, { variant: 'primary', disabled: !this.isNotSoldOut })}
      </form>
    `;
  }
}

export { ProductDetailForm };

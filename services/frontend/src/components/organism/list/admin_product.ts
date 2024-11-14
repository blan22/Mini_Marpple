import { html } from 'rune-ts';
import klass from './product.module.scss';
import { Typography } from '../../atom';
import { ProductCardList } from './product';

class AdminProductCardList extends ProductCardList {
  override template() {
    return html`
      <${this.tagName}>
        <li class="${klass.admin_product_list}">
          <a href="/admin/create">
            <div>${new Typography({ text: '+' }, { size: 'SIZE_24', color: 'WHITE', weight: 'MEDIUM', center: true })}</div>
            ${new Typography(
              { text: '상품 등록' },
              {
                size: 'SIZE_16',
                weight: 'MEDIUM',
                color: 'BLACK',
                center: true,
              },
            )}
          </a>
        </li>
        ${this.itemViews}
      </${this.tagName}>
    `;
  }
}

export { AdminProductCardList };

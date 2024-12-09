import { html } from 'rune-ts';
import klass from './list.module.scss';
import { Typography } from '../../atom';
import { ProductCardList } from './product';

class AdminProductCardList extends ProductCardList {
  override template() {
    return html`
      <${this.tagName} class="${klass.admin_product_list}">
        <li class="${klass.admin_product_list_create}">
          <a href="/admin/create">
            <div>${new Typography(
              { text: '+' },
              { size: 'SIZE_24', color: 'WHITE', weight: 'MEDIUM', center: true, as: 'span' },
            )}</div>
            ${new Typography(
              { text: '상품 등록' },
              {
                size: 'SIZE_16',
                weight: 'MEDIUM',
                color: 'BLACK',
                center: true,
                as: 'span',
              },
            )}
          </a>
        </li>
        ${this.itemViews}
        </${this.tagName}>
        `;
  }
  // ${this.itemViews}
}

export { AdminProductCardList };

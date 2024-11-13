import { html, View } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import { Button, Divider, Typography } from '../../atom';
import { ProductCard } from './product';
import klass from './card.module.scss';

interface OrderCardData extends Omit<Product, 'thumbnail'> {
  href: string;
}

class OrderCard extends View<OrderCardData> {
  override template() {
    return html`
      <li class="${klass.order_card}">
        ${new Typography({ text: '2024.11.08 15:33' }, { size: 'SIZE_14', color: 'DIM_60', weight: 'BOLD' })}
        ${new Divider({})}
        <div class="${klass.order_card_content}">
          ${new ProductCard(this.data, { tagName: 'div' })}
          <div>${new Button({ text: '취소' })}</div>
        </div>
      </li>
    `;
  }
}

export { OrderCard };

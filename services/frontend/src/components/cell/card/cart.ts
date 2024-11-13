import { html, View } from 'rune-ts';
import type { Product } from '@monorepo/shared';
import { ProductCard } from './product';
import { Button, Typography } from '../../atom';
import klass from './card.module.scss';

interface CartCardData extends Omit<Product, 'thumbnail'> {
  href: string;
}

class CartCard extends View<CartCardData> {
  override template() {
    return html`
      <li class="${klass.cart_card}">
        <div class="${klass.cart_card_wrapper}">
          <div class="${klass.cart_card_content}">${new ProductCard(this.data, { tagName: 'div' })}</div>
          <div class="${klass.cart_card_action}">
            <div>
              <span>✕</span>
            </div>
            ${new Button({ text: '수량 변경' })}
          </div>
        </div>
        <div class="${klass.cart_card_detail}">
          ${new Typography(
            { text: '수량 / 1개' },
            {
              size: 'SIZE_14',
              color: 'BLACK',
              weight: 'REGULAR',
              as: 'span',
            },
          )}
          ${new Typography(
            { text: '15,000원' },
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
}

export { CartCard };

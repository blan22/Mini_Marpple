import { html, View } from 'rune-ts';
import { Image, Typography } from '../../atom';
import klass from './card.module.scss';
import type { Product } from '@monorepo/shared';
import { getCategoryByLower, getCategoryNameById } from '../../../lib/utils';

interface ProductCardData extends Omit<Product, 'thumbnail' | 'price'> {
  thumbnail: string;
  price: string;
  href: string;
}

interface ProductCardOptions {
  tagName?: string;
}

class ProductCard extends View<ProductCardData> {
  constructor(
    data: ProductCardData,
    public options: ProductCardOptions = { tagName: 'li' },
  ) {
    super({ ...data });
  }
  override template() {
    return html`
      <${this.options.tagName} class="${klass.product_card}">
        <a href="${this.data.href}">
          ${new Image({
            src: this.data.thumbnail,
          })}
          <div class="${klass.product_content}">
            ${new Typography(
              { text: getCategoryByLower(getCategoryNameById(this.data.category_id)) },
              {
                color: 'BLACK',
                weight: 'BOLD',
                size: 'SIZE_14',
              },
            )}
            ${new Typography(
              { text: this.data.name },
              {
                color: 'BLACK',
                weight: 'REGULAR',
                size: 'SIZE_16',
              },
            )}
            ${new Typography(
              { text: `${parseInt(this.data.price).toLocaleString('ko-kr')}원` },
              {
                color: 'BLACK',
                weight: 'BOLD',
                size: 'SIZE_20',
              },
            )}
          </div>
        </a>
      </${this.options.tagName}>
    `;
  }
}

export { ProductCard };

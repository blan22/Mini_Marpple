import { html, View } from 'rune-ts';
import { Image, Typography } from '../../atom';
import klass from './card.module.scss';
import type { Product } from '@monorepo/shared';

interface ProductCardData extends Omit<Product, 'thumbnail'> {
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
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ward_Cunningham_-_Commons-1.jpg/1920px-Ward_Cunningham_-_Commons-1.jpg',
          })}
          <div class="${klass.product_content}">
            ${new Typography(
              { text: this.data.category },
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
              { text: `${this.data.price}원` },
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

import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, Button, Typography, Divider } from '../../../components';
import { CartCard } from '../../../components/cell/card';

export class CardPage extends Page<{}> {
  override template(_) {
    return html`${new Layout(
      {
        content: html`
          <div class="${klass.container}">
            <ul class="${klass.cart_list}">
              ${new CartCard({
                id: 1,
                name: `product`,
                price: 100,
                stock: 10,
                category: 'goods',
                createAt: new Date(),
                updateAt: new Date(),
                href: `/admin/1`,
              })}
              ${new CartCard({
                id: 1,
                name: `product`,
                price: 100,
                stock: 10,
                category: 'goods',
                createAt: new Date(),
                updateAt: new Date(),
                href: `/admin/1`,
              })}
            </ul>
            <section class="${klass.cart_content}">
              <div>${new Typography({ text: '주문정보' }, { size: 'SIZE_16', weight: 'BOLD' })}</div>
              ${new Divider({})}
              <ul>
                <li>
                  ${new Typography({ text: '총 수량' }, { size: 'SIZE_12', weight: 'REGULAR', as: 'span' })}
                  ${new Typography({ text: '2개' }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' })}
                </li>
                <li>
                  ${new Typography({ text: '총 상품금액' }, { size: 'SIZE_12', weight: 'REGULAR', as: 'span' })}
                  ${new Typography({ text: '30,000원' }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' })}
                </li>
                <li>
                  ${new Typography({ text: '총 배송비' }, { size: 'SIZE_12', weight: 'REGULAR', as: 'span' })}
                  ${new Typography({ text: '3,000원' }, { size: 'SIZE_12', weight: 'BOLD', as: 'span' })}
                </li>
              </ul>
              ${new Divider({ style: 'DOTTED' })} ${new Button({ text: '주문서 작성' })}
            </section>
          </div>
        `,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

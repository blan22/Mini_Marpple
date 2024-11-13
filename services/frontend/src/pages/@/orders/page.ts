import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Button, Image, Select, Layout, Header, Typography } from '../../../components';
import { OrderCard } from '../../../components/cell/card';

export class OrdersPage extends Page<{}> {
  override template(_) {
    return html`${new Layout(
      {
        content: html`
          <div class="${klass.container}">
            <section>
              ${new Typography({ text: '전체' }, { size: 'SIZE_16', color: 'BLACK', weight: 'BOLD' })}
              ${new Typography({ text: '취소완료' }, { size: 'SIZE_16', color: 'BLACK', weight: 'BOLD' })}
            </section>
            <ul class="${klass.order_list}">
              ${new OrderCard({
                id: 1,
                name: `product`,
                price: 100,
                stock: 10,
                category: 'goods',
                createAt: new Date(),
                updateAt: new Date(),
                href: `/admin/1`,
              })}
              ${new OrderCard({
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
          </div>
        `,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

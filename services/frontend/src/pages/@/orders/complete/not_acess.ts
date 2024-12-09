import { html, View } from 'rune-ts';
import { Typography } from '../../../../components';
import klass from './page.module.scss';

class NotAccess extends View<{}> {
  override template() {
    return html`
      <section class="${klass.not_access}">
        ${new Typography({ text: '잘못된 접근입니다.' }, { size: 'SIZE_36', color: 'ERROR', weight: 'BOLD' })}
        <a href="/">홈으로 이동</a>
      </section>
    `;
  }
}

export { NotAccess };

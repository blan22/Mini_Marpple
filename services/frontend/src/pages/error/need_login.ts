import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, Typography } from '../../components';

interface NeedLoginPageData {}

export class NeedLoginPage extends Page<NeedLoginPageData> {
  override template(_) {
    return html`${new Layout(
      {
        content: html`<div class="${klass.container}">
          ${new Typography(
            { text: '로그인이 필요합니다.' },
            { size: 'SIZE_24', weight: 'MEDIUM', color: 'BLACK', as: 'p' },
          )}
          <a href="/login">이동</a>
        </div>`,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

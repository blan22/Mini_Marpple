import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, Typography } from '../../components';

interface InternalServerErrorPageData {
  error?: string;
}

export class InternalServerErrorPage extends Page<InternalServerErrorPageData> {
  override template() {
    return html`${new Layout(
      {
        content: html`<div class="${klass.container}">
          ${new Typography({ text: '500 Server Error' }, { size: 'SIZE_36', weight: 'BOLD', color: 'ERROR', as: 'p' })}
          ${new Typography(
            { text: `${this.data.error ?? '서버에서 에러가 발생했습니다.'}` },
            { size: 'SIZE_24', weight: 'MEDIUM', color: 'ERROR', as: 'p' },
          )}
          <a href="/">홈으로 이동</a>
        </div>`,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

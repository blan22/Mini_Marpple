import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, Typography } from '../../components';

interface NotFoundPageData {}

export class NotFoundPage extends Page<NotFoundPageData> {
  override template(_) {
    return html`${new Layout(
      {
        content: html`<div class="${klass.container}">
          ${new Typography(
            { text: '페이지를 찾을 수 없습니다.' },
            { size: 'SIZE_24', weight: 'MEDIUM', color: 'ERROR', as: 'p' },
          )}
        </div>`,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

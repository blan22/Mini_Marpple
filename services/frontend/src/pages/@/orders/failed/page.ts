import { html, Page } from 'rune-ts';
import klass from './page.module.scss';

class OrderFailedPage extends Page<{}> {
  override template() {
    return html`<div class="${klass.container}"></div>`;
  }
}

export { OrderFailedPage };

import { html, View } from 'rune-ts';
import klass from './range.module.scss';

class Range extends View<{}> {
  override template(_) {
    return html`<input />`;
  }
}

export { Range };

import { html, View } from 'rune-ts';
import klass from './select.module.scss';

class Select extends View<{}> {
  override template(_) {
    return html`
      <select name="셀렉트" class="${klass.select}">
        <option value="옷">옷</option>
        <option value="축구공">축구공</option>
      </select>
    `;
  }
}

export { Select };

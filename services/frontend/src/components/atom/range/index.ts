import { html, View } from 'rune-ts';
import klass from './range.module.scss';

interface RangeData {}

class Range extends View<RangeData> {
  override template(_) {
    return html`
      <div class="${klass.range}">
        <button onclick="range.stepDown()">-</button>
        <input type="number" id="range" value="0" />
        <button onclick="range.stepUp()">+</button>
      </div>
    `;
  }
}

export { Range };

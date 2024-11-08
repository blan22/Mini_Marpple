import { html, View } from 'rune-ts';
import klass from './range.module.scss';

interface RangeData {}

interface RangeOptions {
  require?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  name: string;
}

class Range extends View<RangeData> {
  constructor(
    data: RangeData,
    public options: RangeOptions,
  ) {
    super({ ...data });
  }
  override template() {
    return html`
      <div class="${klass.range}">
        <button type="button" onclick="${this.options.name}.stepDown()">-</button>
        <input
          type="number"
          pattern="^\\d+$"
          id="${this.options.name}"
          value="${this.options.min ?? 0}"
          min="${this.options.min ?? 0}"
          max="${this.options.max ?? 0}"
          name="${this.options.name ? this.options.name : ''}"
          ${this.options.require ? 'require' : ''}
        />
        <button type="button" onclick="${this.options.name}.stepUp()">+</button>
      </div>
    `;
  }
}

export { Range };

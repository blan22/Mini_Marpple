import { html, on, View } from 'rune-ts';
import klass from './range.module.scss';

interface RangeData {}

interface RangeOptions {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  name: string;
  defaultValue?: number | null;
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
        <button class="decrease" type="button">-</button>
        <input
          type="number"
          pattern="^\\d+$"
          id="${this.options.name}"
          value="${this.options.defaultValue ?? 0}"
          min="${this.options.min ?? 0}"
          max="${this.options.max ?? 0}"
          name="${this.options.name ? this.options.name : ''}"
          ${this.options.required ? 'require' : ''}
        />
        <button class="increase" type="button">+</button>
      </div>
    `;
  }

  @on('click', '.increase')
  _increase() {
    this.element().querySelector('input')?.stepUp();
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  @on('click', '.decrease')
  _decrease() {
    this.element().querySelector('input')?.stepDown();
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

export { Range };

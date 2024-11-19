import { html, View } from 'rune-ts';
import klass from './radio.module.scss';

interface RadioData {
  value: string;
  title: string;
}

interface RadioOption {
  name?: string;
}

class Radio extends View<RadioData> {
  constructor(
    data: RadioData,
    public options: RadioOption = {},
  ) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.radio}">
        <input type="radio" value="${this.data.value}" id="${this.data.value}" name="${this.options.name}" />
        <label for="${this.data.value}">${this.data.title}</label>
      </div>
    `;
  }
}

export { Radio };

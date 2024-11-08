import { html, View } from 'rune-ts';
import klass from './select.module.scss';

interface SelectOption {
  name: string;
  value: string;
}

interface SelectData {
  options: SelectOption[];
}

interface SelectOptions {
  name?: string;
}

class Select extends View<SelectData> {
  constructor(
    data: SelectData,
    public options: SelectOptions = {},
  ) {
    super({ ...data });
  }

  override template() {
    return html`
      <select name="${this.options.name}" class="${klass.select}">
        ${this.data.options.map((option) => html`<option value="${option.value}">${option.name}</option>`)}
      </select>
    `;
  }
}

export { Select };

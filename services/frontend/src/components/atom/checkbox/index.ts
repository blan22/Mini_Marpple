import { html, View } from 'rune-ts';
import klass from './checkbox.module.scss';

interface CheckboxOptions {
  name?: string;
  required?: boolean;
}

class Checkbox extends View<{}> {
  constructor(public options: CheckboxOptions = {}) {
    super({});
  }

  override template() {
    return html`
      <div class="${klass.checkbox}">
        <input
          type="checkbox"
          id="${this.options.name}"
          name="${this.options.name}"
          ${this.options.required ? 'required' : ''}
        />
        <label for="${this.options.name}"></label>
      </div>
    `;
  }
}

export { Checkbox };

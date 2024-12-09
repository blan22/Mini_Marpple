import { html, View } from 'rune-ts';
import klass from './input.module.scss';

interface InputData {}

interface InputOptions {
  name?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

class Input extends View<InputData> {
  constructor(
    data: InputData,
    public options: InputOptions = { type: 'text' },
  ) {
    super({ ...data });
  }
  override template() {
    return html`<input
      class="${klass.input}"
      type="${this.options.type}"
      placeholder="${this.options.placeholder}"
      min="${this.options.min ?? 0}"
      max="${this.options.max ?? 0}"
      name="${this.options.name ? this.options.name : ''}"
      ${this.options.required ? 'required' : ''}
    />`;
  }
}

export { Input };

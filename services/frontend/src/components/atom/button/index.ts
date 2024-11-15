import { html, View } from 'rune-ts';
import { klasses } from '../../../lib/utils';
import klass from './button.module.scss';

interface ButtonData {
  text: string;
}

interface ButtonOptions {
  variant: 'primary' | 'line' | 'none';
  disabled?: boolean;
  type?: 'reset' | 'submit' | 'button';
}

class Button extends View<ButtonData> {
  constructor(
    data: ButtonData,
    public options: ButtonOptions = {
      variant: 'primary',
      disabled: false,
      type: 'button',
    },
  ) {
    super({ ...data });
  }

  override template({ text }: ButtonData) {
    return html`
      <button
        class="${klass.button} ${klasses(klass[this.options.variant], this.options.disabled ? klass.disabled : '')}"
        type="${this.options.type ? this.options.type : 'button'}"
        ${this.options.disabled ? 'disabled' : ''}
      >
        ${text}
      </button>
    `;
  }

  disabled() {
    this.options.disabled = true;
    this.redraw();
  }

  enabled() {
    this.options.disabled = false;
    this.redraw();
  }
}

export { Button };

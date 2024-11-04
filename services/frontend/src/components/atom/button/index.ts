import { html, View } from 'rune-ts';

interface ButtonData {
  text: string;
}

class Button extends View<ButtonData> {
  override template({ text }: ButtonData) {
    return html` <button>${text}</button> `;
  }
}

export { Button };

import { html, View } from 'rune-ts';
import { Typography } from '../typography';

interface MessageData {
  text: string;
}

interface MessageOptions {}

class Message extends View<MessageData> {
  private _message: Typography;

  constructor(data: MessageData) {
    super({ ...data });

    this._message = new Typography(
      { text: this.data.text },
      {
        color: 'ERROR',
        as: 'span',
        size: 'SIZE_16',
        weight: 'BOLD',
        center: false,
      },
    );
  }

  override template() {
    return html`<div>${this._message}</div>`;
  }

  setMessage(message: string) {
    this._message.element().textContent = message;
  }
}

export { Message };

import { html, View, type Html } from 'rune-ts';
import klass from './card.module.scss';

interface EmptyData {
  text?: string;
}

class Empty extends View<EmptyData> {
  constructor(data: EmptyData = { text: '상품' }) {
    super({ ...data });
  }

  protected override template(): Html {
    return html`
      <li class="${klass.empty_card}">
        <div>${this.data.text}이 존재하지 않습니다.</div>
      </li>
    `;
  }
}

export { Empty };

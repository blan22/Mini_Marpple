import { html, Page } from 'rune-ts';
import { Button } from '../../components';

export class HomePage extends Page<{}> {
  override template(_) {
    return html`
      <div class="font_48_bold">
        <p>Hello World With Rune xD</p>
        ${new Button({ text: '버튼' })}
      </div>
    `;
  }
}

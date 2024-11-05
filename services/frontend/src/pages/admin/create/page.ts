import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Button, Image, Select, Layout, Header, ImageUploader } from '../../../components';

export class AdminProductCreatePage extends Page<{}> {
  override template(_) {
    return html`${new Layout(
      {
        content: html`
          <div class="${klass.container}">
            <div class="${klass.left}">
              ${new Image({
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ward_Cunningham_-_Commons-1.jpg/1920px-Ward_Cunningham_-_Commons-1.jpg',
              })}
            </div>
            <div class="${klass.right}">
              ${new ImageUploader({})} ${new Select({})}
              ${new Button({ text: '버튼' }, { variant: 'primary', disabled: true })}
            </div>
          </div>
        `,
      },
      {
        header: new Header({}),
      },
    )}`;
  }
}

import { html, View } from 'rune-ts';
import klass from './image.module.scss';
import { Button } from '../../atom';

class ImageUploader extends View<{}> {
  override template() {
    return html`
      <div class="${klass.uploader}">
        <p>image.png</p>
        <div>
          <label for="thumbnail">
            <span>썸네일 첨부</span>
            <span>+</span>
          </label>
          ${new Button({ text: '삭제' })}
          <input id="thumbnail" type="file" accept="image/*" />
        </div>
      </div>
    `;
  }
}

export { ImageUploader };

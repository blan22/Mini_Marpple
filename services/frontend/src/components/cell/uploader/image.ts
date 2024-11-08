import { html, on, View, CustomEventWithDetail } from 'rune-ts';
import { pipe, reduce, take, toArray } from '@fxts/core';
import klass from './image.module.scss';
import { Button, Typography } from '../../atom';

export class ChangeImageUploaderFileEvent extends CustomEventWithDetail<File | null> {}

interface ImageUploaderOptions {
  name?: string;
}

class ImageUploader extends View<{}> {
  private _thumbnail: File | null = null;

  constructor(
    data: {},
    public options: ImageUploaderOptions = {},
  ) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.uploader}">
        <div class="${klass.name}">
          ${this._thumbnail
            ? html`${new Typography({ text: this._thumbnail.name })}`
            : html`${new Typography(
                { text: '썸네일을 첨부해주세요.' },
                { as: 'span', color: 'GRAY_50', weight: 'MEDIUM', size: 'SIZE_16' },
              )}`}
        </div>
        <div>
          <label for="thumbnail">
            <span>썸네일 첨부</span>
            <span>+</span>
          </label>
          ${new Button({ text: '삭제' })}
          <input name="${this.options.name ? this.options.name : ''}" id="thumbnail" type="file" accept="image/*" />
        </div>
      </div>
    `;
  }

  @on('change')
  onChange(e) {
    if (e.target.id === 'thumbnail') {
      this._thumbnail = pipe(
        toArray(e.target.files),
        take(1),
        reduce((value: File) => value),
      );

      this.dispatchEvent(ChangeImageUploaderFileEvent, { detail: this._thumbnail, bubbles: true });
      this.redraw();
    }
  }

  @on('click')
  _reset(e) {
    if (!this._thumbnail) return;
    const button = this.subView(Button);

    if (e.target === button?.element()) {
      this._thumbnail = null;

      this.dispatchEvent(ChangeImageUploaderFileEvent, { detail: this._thumbnail, bubbles: true });
      this.redraw();
    }
  }
}

export { ImageUploader };

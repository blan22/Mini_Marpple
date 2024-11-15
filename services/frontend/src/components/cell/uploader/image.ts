import { html, on, View, CustomEventWithDetail } from 'rune-ts';
import { pipe, reduce, take, toArray } from '@fxts/core';
import klass from './image.module.scss';
import { Button, Typography } from '../../atom';

export class ChangeImageUploaderFileEvent extends CustomEventWithDetail<File | null> {}

interface ImageUploaderData {
  thumbnail?: File | null;
}

interface ImageUploaderOptions {
  name?: string;
  defaultValue?: string | null;
}

class ImageUploader extends View<ImageUploaderData> {
  constructor(
    data: ImageUploaderData,
    public options: ImageUploaderOptions = {},
  ) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.uploader}">
        <div class="${klass.name}">
          ${this.data.thumbnail
            ? html`${new Typography(
                { text: this.data.thumbnail.name },
                { as: 'span', color: 'BLACK', weight: 'MEDIUM', size: 'SIZE_16', full: true },
              )}`
            : html`${new Typography(
                { text: this.options.defaultValue ?? '썸네일을 첨부해주세요.' },
                { as: 'span', color: 'GRAY_50', weight: 'MEDIUM', size: 'SIZE_16', full: true },
              )}`}
        </div>
        <div>
          <label for="thumbnail">
            <span>썸네일 첨부</span>
            <span>+</span>
          </label>
          ${new Button({ text: '삭제' })}
          <input
            name="${this.options.name ? this.options.name : 'thumbnail'}"
            id="thumbnail"
            type="file"
            accept="image/*"
          />
        </div>
      </div>
    `;
  }

  @on('change', 'input')
  onChange(e) {
    if (e.target.id === 'thumbnail') {
      this.data.thumbnail = pipe(
        toArray(e.target.files),
        take(1),
        reduce((value: File) => value),
      );

      this.dispatchEvent(ChangeImageUploaderFileEvent, { detail: this.data.thumbnail, bubbles: true });
      this.redraw();
    }
  }

  @on('click')
  _reset(e) {
    if (!this.data.thumbnail) return;
    const button = this.subView(Button);

    if (e.target === button?.element()) {
      this.data.thumbnail = null;
      this.options.defaultValue = null;

      this.dispatchEvent(ChangeImageUploaderFileEvent, { detail: this.data.thumbnail, bubbles: true });
      this.redraw();
    }
  }
}

export { ImageUploader };

import { html, View } from 'rune-ts';
import klass from './thumbnail.module.scss';
import { Typography, Image } from '../../atom';

interface ThumbnailData {
  url?: string | null;
}

class Thumbnail extends View<ThumbnailData> {
  constructor(data: ThumbnailData) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.thumbnail}">
        ${this.data.url
          ? html`${new Image(
              {
                src: this.data.url,
              },
              {
                width: '100%',
                height: '100%',
              },
            )}`
          : html`
              <div class="${klass.no_image}">
                ${new Typography({ text: 'No' }, { as: 'span', size: 'SIZE_20', weight: 'BOLD', center: true })}
                ${new Typography({ text: 'Image' }, { as: 'span', size: 'SIZE_20', weight: 'BOLD', center: true })}
              </div>
            `}
      </div>
    `;
  }

  setThumbnail(data: File | null) {
    if (this.data.url) {
      URL.revokeObjectURL(this.data.url);
    }

    this.data.url = data ? URL.createObjectURL(data) : null;

    this.redraw();
  }
}

export { Thumbnail };

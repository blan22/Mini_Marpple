import { html, View } from 'rune-ts';
import klass from './thumbnail.module.scss';
import { Typography, Image } from '../../atom';

interface ThumbnailData {
  thumbnail: File | null;
}

class Thumbnail extends View<ThumbnailData> {
  private _url: string | null = null;

  override template() {
    return html`
      <div class="${klass.thumbnail}">
        ${this._url
          ? html`${new Image(
              {
                src: this._url,
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
    if (this._url) {
      URL.revokeObjectURL(this._url);
    }

    this.data.thumbnail = data;

    this._url = this.data.thumbnail ? URL.createObjectURL(this.data.thumbnail) : null;

    this.redraw();
  }
}

export { Thumbnail };

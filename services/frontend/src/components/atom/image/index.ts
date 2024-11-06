import { html, View } from 'rune-ts';
import klass from './image.module.scss';
import { klasses } from '../../../lib/utils';

interface ImageData {
  src: string;
}

interface ImageOptions {
  alt?: string;
  lazy?: boolean;
  fill?: boolean;
  width?: string;
  height?: string;
  priority?: 'high' | 'low' | 'auto';
}

class Image extends View<ImageData> {
  constructor(
    data: ImageData,
    public options: ImageOptions = {
      lazy: true,
      width: '100%',
      height: '100%',
      priority: 'high',
      fill: false,
    },
  ) {
    super({ ...data });
  }

  override template({ src }: ImageData) {
    return html`<img
      src="${src}"
      alt="${this.options.alt ?? src}"
      loading="${this.options.lazy ? 'lazy' : ''}"
      width="${this.options.width}"
      height="${this.options.height}"
      fetchpriority="${this.options.priority ? this.options.priority : 'auto'}"
      class="${klasses(klass.image, this.options.fill ? klass.fill : '')}"
    />`;
  }
}

export { Image };

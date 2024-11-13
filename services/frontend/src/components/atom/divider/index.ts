import { html, View } from 'rune-ts';
import klass from './divider.module.scss';
import { klasses } from '../../../lib/utils';

const DIVIDER_SIZE = {
  SMALL: klass.small,
  MEDIUM: klass.medium,
  LARGE: klass.large,
};

const DIVIDER_STYLE = {
  DOTTED: klass.dotted,
  DASHED: klass.dashed,
  NONE: klass.none,
};

interface DividerData {
  className?: string;
  style?: 'DOTTED' | 'DASHED' | 'NONE';
  size?: 'SMALL' | 'MEDIUM' | 'LARGE';
}

class Divider extends View<DividerData> {
  override template() {
    return html`<div
      class="${klasses(
        klass.divider,
        this.data.className ?? '',
        this.data.style ? DIVIDER_STYLE[this.data.style] : DIVIDER_STYLE['NONE'],
        this.data.size ? DIVIDER_SIZE[this.data.size] : DIVIDER_SIZE['MEDIUM'],
      )}"
    ></div>`;
  }
}

export { Divider };

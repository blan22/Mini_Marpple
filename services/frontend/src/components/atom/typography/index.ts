import { html, View } from 'rune-ts';
import klass from './typography.module.scss';
import { klasses } from '../../../lib/utils';

const FONT_COLOR = {
  BLACK: klass.black,
  WHITE: klass.white,
  PRIMARY: klass.primary,
  SECONDARY: klass.secondary,
  SUCCESS: klass.success,
  ERROR: klass.error,
  ACCENT: klass.accent,
  GRAY_50: klass.gray_50,
  GRAY_20: klass.gray_20,
  GRAY_10: klass.gray_10,
  DIM_5: klass.dim_5,
  DIM_10: klass.dim_10,
  DIM_30: klass.dim_30,
  DIM_60: klass.dim_60,
};

const FONT_SIZE = {
  SIZE_36: klass.size_36,
  SIZE_24: klass.size_24,
  SIZE_20: klass.size_20,
  SIZE_16: klass.size_16,
  SIZE_14: klass.size_14,
  SIZE_12: klass.size_12,
};

const FONT_WEIGHT = {
  BOLD: klass.bold,
  MEDIUM: klass.medium,
  REGULAR: klass.regular,
};

interface TypographyData {
  text?: string;
}

interface TypographyOptions {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: keyof typeof FONT_SIZE;
  weight?: keyof typeof FONT_WEIGHT;
  color?: keyof typeof FONT_COLOR;
  center?: boolean;
}

class Typography extends View<TypographyData> {
  constructor(
    data: TypographyData,
    public options: TypographyOptions = {
      as: 'span',
      color: 'BLACK',
      weight: 'MEDIUM',
      size: 'SIZE_16',
      center: false,
    },
  ) {
    super({ ...data });
  }

  override template() {
    return html`<${this.options.as} class="${klasses(klass.typography, FONT_SIZE[this.options.size], FONT_COLOR[this.options.color], FONT_WEIGHT[this.options.weight], this.options.center ? klass.center : '')}">${this.data.text}</${this.options.as}>`;
  }
}

export { Typography };

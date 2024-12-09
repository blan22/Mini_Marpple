import { html, View, type Html } from 'rune-ts';
import klass from './layout.module.scss';

interface LayoutData {
  content?: View | Html;
}

interface LayoutOptions {
  header?: View | Html;
  footer?: View | Html;
}

class Layout extends View<LayoutData> {
  constructor(
    data: LayoutData,
    public options: LayoutOptions = {},
  ) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.layout}">
        ${this.options.header ? html`<header>${this.options.header}</header>` : ''}
        <main>${this.data.content}</main>
        ${this.options.footer ? html`<footer>${this.options.footer}</footer>` : ''}
      </div>
    `;
  }

  getSubViews<T extends Parameters<typeof this.subViews>[0]>(view: T) {
    return this.subViews(view);
  }
}

export { Layout };

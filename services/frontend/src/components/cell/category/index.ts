import { html, ListView, on, View, type Html } from 'rune-ts';
import klass from './category.module.scss';
import { Router } from '../../../lib/csr';
import { each } from '@fxts/core';

interface CategoryNodeData {
  title: string;
  category: string;
  query?: string;
}

interface CategoryData {
  categories: CategoryNodeData[];
}

class CategoryNode extends View<CategoryNodeData> {
  protected override template(): Html {
    return html`
      <li class="${this.data.category === this.data.query ? klass.category_disabled : ''}">
        <button>
          <span>${this.data.title}</span>
        </button>
      </li>
    `;
  }

  @on('click', 'button')
  _click() {
    Router.push(`${window.location.origin}?category=${this.data.category}`);
  }

  update(category: string | undefined) {
    this.data.query = category;
    if (this.data.category === category) this.disabled();
    else this.enabled();
  }

  enabled() {
    this.element().classList.remove(klass.category_disabled);
  }

  disabled() {
    this.element().classList.add(klass.category_disabled);
  }
}

class Category extends ListView<CategoryNodeData, CategoryNode> {
  override tagName = 'ul';
  override ItemView = CategoryNode;

  override template() {
    return html`
        <${this.tagName} class="${klass.category}">
          ${this.itemViews}
        </${this.tagName}>
    `;
  }

  update(category: string | undefined) {
    each((itemView) => itemView.update(category), this.itemViews);
  }
}

export { Category };
export type { CategoryData, CategoryNode };

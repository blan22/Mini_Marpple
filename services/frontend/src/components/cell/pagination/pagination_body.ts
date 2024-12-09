import { CustomEventWithDetail, html, ListView, on, View, type Html } from 'rune-ts';
import klass from './pagination.module.scss';
import { klasses } from '../../../lib/utils';

export class PaginationBodyNodeClickEvent extends CustomEventWithDetail<number> {}

interface PaginationBodyNodeData {
  value: number;
  title: string;
  page: number;
}

class PaginationBodyNode extends View<PaginationBodyNodeData> {
  protected override template(): Html {
    return html`
      <li>
        <button
          class="${klasses(
            this.data.page == this.data.value
              ? klass.pagination_page_node_enabled
              : klass.pagination_page_node_disabled,
          )}"
          type="button"
        >
          ${this.data.title}
        </button>
      </li>
    `;
  }

  @on('click', 'button')
  private _click() {
    this.dispatchEvent(PaginationBodyNodeClickEvent, { detail: this.data.value, bubbles: true });
  }
}

class PaginationBody extends ListView<PaginationBodyNodeData, PaginationBodyNode> {
  override tagName = 'ul';
  override ItemView = PaginationBodyNode;

  override template() {
    return html`
    <${this.tagName} class="${klass.pagination_page}">
      ${this.itemViews}
    </${this.tagName}>
  `;
  }
}

export { PaginationBody, PaginationBodyNode };
export type { PaginationBodyNodeData };

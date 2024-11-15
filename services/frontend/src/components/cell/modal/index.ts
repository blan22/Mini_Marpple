import { html, View, type Html, CustomEventWithDetail, on } from 'rune-ts';
import klass from './modal.module.scss';

interface ModalData {
  content?: View | Html;
}

export class ModalCancelEvent<T extends unknown> extends CustomEventWithDetail<T> {}

class Modal extends View<ModalData> {
  constructor(data: ModalData = {}) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.modal}">
        <div class="${klass.modal_content}">${this.data.content ? this.data.content : ''}</div>
      </div>
    `;
  }

  @on('click')
  _clickOutside(e: PointerEvent) {
    if (e.currentTarget === e.target) this.dispatchEvent(ModalCancelEvent, { bubbles: true, detail: {} });
  }

  open(content: View | Html) {
    this.data.content = content;
    this.redraw();
    this.element().style.display = 'flex';
  }

  close() {
    this.element().style.display = 'none';
  }
}

export { Modal };

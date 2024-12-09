import { $, html } from 'rune-ts';
import { PaginationAction } from './pagination_action';
import type { PaginationData } from '.';

class PaginationGroupPrev extends PaginationAction {
  override template() {
    return html`
      <button ${this.isDisabled(this.data) ? 'disabled' : ''}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 16.1028C17 15.99 16.959 15.8721 16.8667 15.785L13.0841 12.0023L16.8667 8.21964C17.041 8.04537 17.041 7.75834 16.8667 7.58407C16.6925 7.4098 16.4054 7.4098 16.2312 7.58407L12.1307 11.6845C11.9564 11.8588 11.9564 12.1458 12.1307 12.3201L16.2312 16.4206C16.4054 16.5948 16.6925 16.5948 16.8667 16.4206C16.9539 16.3334 17 16.2155 17 16.1028Z"
            fill="currentColor"
          ></path>
          <path
            d="M12 16.1028C12 15.99 11.959 15.8721 11.8667 15.785L8.08406 12.0023L11.8667 8.21964C12.041 8.04537 12.041 7.75834 11.8667 7.58407C11.6925 7.4098 11.4054 7.4098 11.2312 7.58407L7.1307 11.6845C6.95643 11.8588 6.95643 12.1458 7.1307 12.3201L11.2312 16.4206C11.4054 16.5948 11.6925 16.5948 11.8667 16.4206C11.9539 16.3334 12 16.2155 12 16.1028Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    `;
  }

  override isDisabled(data: PaginationData): boolean {
    return data.length <= data.limit || !(Math.ceil(data.page / data.limit) >= Math.ceil(data.length / data.limit));
  }

  override enabled(): void {
    $('.PaginationGroupPrev').removeAttribute('disabled');
  }

  override disabled(): void {
    $('.PaginationGroupPrev').setAttribute('disabled', 'true');
  }
}

export { PaginationGroupPrev };

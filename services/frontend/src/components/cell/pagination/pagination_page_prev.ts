import { $, html, View } from 'rune-ts';
import type { PaginationData } from '.';
import { PaginationAction } from './pagination_action';

class PaginationPagePrev extends PaginationAction {
  override template() {
    return html`
      <button ${this.isDisabled(this.data) ? 'disabled' : ''}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.5 16.1029C14.5 15.9901 14.459 15.8723 14.3667 15.7851L10.5841 12.0024L14.3667 8.21977C14.541 8.0455 14.541 7.75846 14.3667 7.58419C14.1925 7.40992 13.9054 7.40992 13.7312 7.58419L9.6307 11.6847C9.45643 11.8589 9.45643 12.146 9.6307 12.3202L13.7312 16.4207C13.9054 16.595 14.1925 16.595 14.3667 16.4207C14.4539 16.3336 14.5 16.2157 14.5 16.1029Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    `;
  }

  override isDisabled(data: PaginationData): boolean {
    return !(data.page > 1);
  }

  override enabled(): void {
    $('.PaginationPagePrev').removeAttribute('disabled');
  }

  override disabled(): void {
    $('.PaginationPagePrev').setAttribute('disabled', 'true');
  }
}

export { PaginationPagePrev };

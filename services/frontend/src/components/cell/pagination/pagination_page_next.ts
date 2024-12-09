import { $, html, View } from 'rune-ts';
import { PaginationAction } from './pagination_action';
import type { PaginationData } from '.';

class PaginationPageNext extends PaginationAction {
  override template() {
    return html`
      <button ${this.isDisabled(this.data) ? 'disabled' : ''}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path
            d="M9.5 16.1029C9.5 15.9901 9.541 15.8723 9.63326 15.7851L13.4159 12.0024L9.63326 8.21977C9.45899 8.0455 9.45899 7.75846 9.63326 7.58419C9.80753 7.40992 10.0946 7.40992 10.2688 7.58419L14.3693 11.6847C14.5436 11.8589 14.5436 12.146 14.3693 12.3202L10.2688 16.4207C10.0946 16.595 9.80753 16.595 9.63326 16.4207C9.54613 16.3336 9.5 16.2157 9.5 16.1029Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    `;
  }

  override isDisabled(data: PaginationData): boolean {
    return !(data.page < data.length);
  }

  override enabled(): void {
    $('.PaginationPageNext').removeAttribute('disabled');
  }

  override disabled(): void {
    $('.PaginationPageNext').setAttribute('disabled', 'true');
  }
}

export { PaginationPageNext };

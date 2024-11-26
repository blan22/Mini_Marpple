import { $, html, View } from 'rune-ts';
import { PaginationAction } from './pagination_action';
import type { PaginationData } from '.';

class PaginationGroupNext extends PaginationAction {
  override template() {
    return html`
      <button ${this.isDisabled(this.data) ? 'disabled' : ''}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 16.1029C7 15.9901 7.041 15.8723 7.13326 15.7851L10.9159 12.0024L7.13326 8.21977C6.95899 8.0455 6.95899 7.75846 7.13326 7.58419C7.30753 7.40992 7.59457 7.40992 7.76884 7.58419L11.8693 11.6847C12.0436 11.8589 12.0436 12.146 11.8693 12.3202L7.76884 16.4207C7.59457 16.595 7.30753 16.595 7.13326 16.4207C7.04613 16.3336 7 16.2157 7 16.1029Z"
            fill="currentColor"
          ></path>
          <path
            d="M12 16.1029C12 15.9901 12.041 15.8723 12.1333 15.7851L15.9159 12.0024L12.1333 8.21977C11.959 8.0455 11.959 7.75846 12.1333 7.58419C12.3075 7.40992 12.5946 7.40992 12.7688 7.58419L16.8693 11.6847C17.0436 11.8589 17.0436 12.146 16.8693 12.3202L12.7688 16.4207C12.5946 16.595 12.3075 16.595 12.1333 16.4207C12.0461 16.3336 12 16.2157 12 16.1029Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    `;
  }

  override isDisabled(data: PaginationData): boolean {
    return Math.ceil(data.page / data.limit) >= Math.ceil(data.length / data.limit);
  }

  override enabled(): void {
    $('.PaginationGroupNext').removeAttribute('disabled');
  }

  override disabled(): void {
    $('.PaginationGroupNext').setAttribute('disabled', 'true');
  }
}

export { PaginationGroupNext };

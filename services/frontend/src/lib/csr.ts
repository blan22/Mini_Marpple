import { CustomEventWithDetail, Page, type CustomEventWithDetailInit } from 'rune-ts';
import { getSearchQueryFromUrl } from './utils';

export class HistoryEvent<T extends unknown> extends CustomEventWithDetail<T> {
  constructor(options: CustomEventWithDetailInit<T>) {
    super('HistoryEvent', options);
  }
}

export type RouterQuery = ReturnType<typeof getSearchQueryFromUrl>;

export type CsrHistoryEvent<T extends unknown> = HistoryEvent<T> & {
  query: ReturnType<typeof getSearchQueryFromUrl>;
};

class Router {
  static push<T = null>(
    url: string,
    query?: RouterQuery,
    options: HistoryEvent<T> = { detail: null } as HistoryEvent<T>,
  ) {
    const event = new HistoryEvent<T>(options);
    history.pushState(null, '', this._url(url, query));
    window.dispatchEvent(event);
  }

  private static _url<T = null>(url: string, query?: RouterQuery) {
    const convertedUrl = new URL(url);
    if (query)
      Object.entries({ ...getSearchQueryFromUrl(), ...query }).forEach(([query, value]) =>
        convertedUrl.searchParams.set(query, value),
      );
    return convertedUrl.toString();
  }
}

class PageWithCSR<T extends object> extends Page<T> {
  protected onCsrStart() {}

  protected onCsrEnd() {}

  protected historyEvent<T>(e: CsrHistoryEvent<T>) {}

  private async _csr<T>(e: HistoryEvent<T>) {
    Object.assign(e, { query: getSearchQueryFromUrl() });

    this.onCsrStart();
    await this.historyEvent(e as CsrHistoryEvent<T>);
    this.onCsrEnd();
  }

  override onRender() {
    window.addEventListener(HistoryEvent.name, (e) => this._csr(e));
  }

  override onUnmount(): void {
    window.removeEventListener(HistoryEvent.name, (e) => this._csr(e));
  }
}

export { Router, PageWithCSR };

/**
 * @todo: 전역에서 csr 라우터를 관리, 어떻게?
 * push와 같은 history 이벤트가 발생하면 룬에서 어떻게 부분적으로 업데이트를 할 것 인지
 */

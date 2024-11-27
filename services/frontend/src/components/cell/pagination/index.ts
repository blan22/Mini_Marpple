import { html, on, View } from 'rune-ts';
import klass from './pagination.module.scss';
import { PaginationBody, PaginationBodyNodeClickEvent } from './pagination_body';
import { PaginationGroupPrev } from './pagination_group_prev';
import { PaginationGroupNext } from './pagination_group_next';
import { PaginationPageNext } from './pagination_page_next';
import { PaginationPagePrev } from './pagination_page_prev';
import { Router } from '../../../lib/csr';
import { map, pipe, range, toArray } from '@fxts/core';

export interface PaginationData {
  page: number;
  limit: number;
  length: number;
}

class Pagination extends View<PaginationData> {
  private _paginationBodyView: PaginationBody;
  private _paginationGroupPrev: PaginationGroupPrev;
  private _paginationGroupNext: PaginationGroupNext;
  private _paginationPageNext: PaginationPageNext;
  private _paginationPagePrev: PaginationPagePrev;

  constructor(data: PaginationData) {
    super({ ...data });

    this.data.length = data.length || 1;
    this.data.page = data.page || 1;
    this.data.limit = data.limit || 10;

    this._paginationBodyView = new PaginationBody(
      Array.from({ length: this.data.length }, (_, i) => ({ title: `${i + 1}`, value: i + 1, page: this.data.page })),
    );

    this._paginationGroupNext = new PaginationGroupNext(this.data);
    this._paginationGroupPrev = new PaginationGroupPrev(this.data);
    this._paginationPageNext = new PaginationPageNext(this.data);
    this._paginationPagePrev = new PaginationPagePrev(this.data);

    this._updatePageBody();
  }

  override template() {
    return html`
      <div class="${klass.pagination}">
        <div class="${klass.pagination_prev}">${this._paginationGroupPrev} ${this._paginationPagePrev}</div>
        ${this._paginationBodyView}
        <div class="${klass.pagination_next}">${this._paginationPageNext} ${this._paginationGroupNext}</div>
      </div>
    `;
  }

  private _updatePageBody() {
    const start = (Math.ceil(this.data.page / this.data.limit) - 1) * this.data.limit + 1;
    const end = Math.min(start + this.data.limit - 1, this.data.length) + 1;
    this._paginationBodyView.set(
      pipe(
        range(start, end),
        map((item) => ({ title: `${item}`, value: item, page: this.data.page })),
        toArray,
      ),
    );
  }

  private _updateGroupPrev() {
    if (this._paginationGroupPrev.isDisabled(this.data)) this._paginationGroupPrev.disabled();
    else this._paginationGroupPrev.enabled();
  }

  private _updateGroupNext() {
    if (this._paginationGroupNext.isDisabled(this.data)) this._paginationGroupNext.disabled();
    else this._paginationGroupNext.enabled();
  }

  private _updatePageNext() {
    if (this._paginationPageNext.isDisabled(this.data)) this._paginationPageNext.disabled();
    else this._paginationPageNext.enabled();
  }

  private _updatePagePrev() {
    if (this._paginationPagePrev.isDisabled(this.data)) this._paginationPagePrev.disabled();
    else this._paginationPagePrev.enabled();
  }

  @on(PaginationBodyNodeClickEvent)
  private _clickBodyNode(e: PaginationBodyNodeClickEvent) {
    this.data.page = e.detail;
    this._update();
  }

  @on('click', '.PaginationGroupNext')
  private _clickGroupNext() {
    this.data.page = Math.min(this.data.page + this.data.limit, this.data.length);
    this._update();
  }

  @on('click', '.PaginationGroupPrev')
  private _clickGroupPrev() {
    this.data.page = Math.max(this.data.page - this.data.limit, 1);
    this._update();
  }

  @on('click', '.PaginationPageNext')
  private _clickPageNext() {
    if (this.data.page < this.data.length) this.data.page++;
    this._update();
  }

  @on('click', '.PaginationPagePrev')
  private _clickPagePrev() {
    if (this.data.page > 1) this.data.page--;
    this._update();
  }

  private _scrollToTop() {
    if (window !== undefined) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private _update() {
    this._updateGroupNext();
    this._updateGroupPrev();
    this._updatePageNext();
    this._updatePagePrev();
    this._updatePageBody();
    this._scrollToTop();
    // @think: csr을 페이지네이션에서 하는게 아니라 이벤트 전파?
    Router.push(`${window.location.href}`, {
      page: `${this.data.page}`,
    });
  }

  update(data: PaginationData) {
    this.data.length = data.length || 1;
    this.data.page = data.page;
    this.data.limit = data.limit;
    this.redraw();
  }
}

export { Pagination };

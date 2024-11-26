import { html } from 'rune-ts';
import klass from './page.module.scss';
import { Layout, Header, ProductCardList, Category, Loading, Pagination } from '../../components';
import type { Product } from '@monorepo/shared';
import { CATEGORY_MAP } from '../../shared/constants';
import { PageWithCSR, type CsrHistoryEvent } from '../../lib/csr';
import { getProductsByQuery } from '../../lib/api';

interface HomePageData {
  page: number;
  total: number;
  category?: keyof typeof CATEGORY_MAP;
  products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[];
}

export class HomePage extends PageWithCSR<HomePageData> {
  private _categoryView: Category;
  private _productCardListView: ProductCardList;
  private _paginationView: Pagination;

  constructor(data) {
    super({ ...data });

    this._categoryView = new Category(
      Object.entries(CATEGORY_MAP).map(([key, value]) => ({
        title: value,
        category: key,
        query: this.data.category ?? 'all',
      })),
    );
    this._productCardListView = new ProductCardList(this.data.products);
    this._paginationView = new Pagination({ limit: 10, length: this.data.total, page: this.data.page });
  }

  override template() {
    return html`
      <div class="${klass.page}">
        ${new Layout(
          {
            content: html` <div class="${klass.container}">${this._categoryView} ${this._productCardListView}</div> `,
          },
          {
            header: new Header({}),
            footer: this._paginationView,
          },
        )}
      </div>
    `;
  }

  protected override onCsrStart(): void {
    Loading.start();
  }

  protected override onCsrEnd(): void {
    Loading.end();
  }

  protected override async historyEvent<T>(e: CsrHistoryEvent<T>) {
    const { page = '1', category = undefined } = e.query;

    const result = await getProductsByQuery({
      category,
      page: parseInt(page),
      limit: 10,
    });
    this._productCardListView.update(result.data);
    this._categoryView.update(category);
    this._paginationView.update({ page: parseInt(page), length: result.data.total, limit: 10 });
  }
}

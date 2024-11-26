import { AdminPage } from './page';
import { AdminProductCreatePage } from './create/page';
import { AdminProductUpdatePage } from './update/page';
import type { RenderHandlerType } from '../../types/common';
import { convertURLtoFile, createMetaData, getCategoryNameById, takeOne } from '../../lib/utils';
import { getProductByIdSS, getProductsByQuerySS } from '../../lib/api';
import { type Product } from '@monorepo/shared';
import { MetaView } from '@rune-ts/server';

export const adminRouter = {
  ['/admin']: AdminPage,
  ['/admin/create']: AdminProductCreatePage,
  ['/admin/:id']: AdminProductUpdatePage,
};

export const adminProductHanlder: RenderHandlerType<typeof AdminPage> = (factory) => {
  return async (req, res) => {
    const { page = '1' } = req.query;
    const result = await getProductsByQuerySS({ page: parseInt(page), limit: 10 });
    const products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[] = result.data.products.map(
      (product) => ({
        ...product,
        category: getCategoryNameById(product.category_id),
        href: `/admin/${product.id}`,
      }),
    );

    res.send(new MetaView(factory({ products }), createMetaData({ head: { title: 'ADMIN' } })).toHtml());
  };
};

export const adminProductCreateHanlder: RenderHandlerType<typeof AdminProductCreatePage> = (factory) => {
  return async (_, res) => {
    res.send(
      new MetaView(
        factory({ name: null, thumbnail: null, category: null, price: null, stock: null }),
        createMetaData({ head: { title: 'ADMIN CREATE UPDATE' } }),
      ).toHtml(),
    );
  };
};

export const adminProductUpdateHandler: RenderHandlerType<typeof AdminProductUpdatePage> = (factory) => {
  return async (req, res) => {
    const product = await getProductByIdSS(parseInt(req.params.id!)).then((result): Product => result.data);
    const thumbnail = await convertURLtoFile(product.thumbnail);

    res.send(
      new MetaView(
        factory({
          ...product,
          thumbnailUrl: product.thumbnail,
          thumbnail,
          category: getCategoryNameById(product.category_id),
        }),
        createMetaData({ head: { title: 'ADMIN PRODUCT UPDATE' } }),
      ).toHtml(),
    );
  };
};

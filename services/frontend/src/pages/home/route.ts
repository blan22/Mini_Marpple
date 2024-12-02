import { MetaView } from '@rune-ts/server';
import { HomePage } from './page';
import type { RenderHandlerType } from '../../types/common';
import { createMetaData, getCategoryNameById } from '../../lib/utils';
import { getProductsByQuerySS } from '../../lib/api';

export const homeRouter = {
  ['/']: HomePage,
};

export const homeHandler: RenderHandlerType<typeof HomePage> = (factory) => {
  return async (req, res) => {
    const { page = '1', category } = req.query;
    const result = await getProductsByQuerySS({
      category,
      page: parseInt(page),
      limit: 2,
    }).then((result) => ({
      products: result.data.products?.map((product) => ({
        ...product,
        category: getCategoryNameById(product.category_id),
        href: `/product/${product.id}`,
      })),
      total: result.data.total,
    }));

    res.send(
      new MetaView(
        factory({
          products: result.products,
          total: result.total,
          page: parseInt(page),
          params: req.path,
          category,
        }),
        createMetaData({ head: { title: 'HOME' } }),
      ).toHtml(),
    );
  };
};

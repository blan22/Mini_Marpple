import { MetaView } from '@rune-ts/server';
import { HomePage } from './page';
import type { RenderHandlerType } from '../../types/common';
import { createMetaData, getCategoryNameById } from '../../lib/utils';
import { getProductsByQuerySS } from '../../lib/api';

export const homeRouter = {
  ['/']: HomePage,
};

export const homeHandler: RenderHandlerType<typeof HomePage> = (factory) => {
  return async (_, res) => {
    const products = await getProductsByQuerySS().then((result) =>
      result.data?.map((product) => ({
        ...product,
        category: getCategoryNameById(product.category_id),
        href: `/product/${product.id}`,
      })),
    );

    res.send(new MetaView(factory({ products }), createMetaData({ head: { title: 'HOME' } })).toHtml());
  };
};

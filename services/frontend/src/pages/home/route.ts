import { MetaView } from '@rune-ts/server';
import { type Product } from '@monorepo/shared';
import { HomePage } from './page';
import type { RenderHandlerType } from '../../types/common';
import { createMetaData, getCategoryNameById } from '../../lib/utils';
import { getProductsByQuery } from '../../lib/api';

export const homeRouter = {
  ['/']: HomePage,
};

export const homeHandler: RenderHandlerType<typeof HomePage> = (factory) => {
  return async (_, res) => {
    const result = await getProductsByQuery();
    const products: (Product & { href: string })[] = result.data?.map((product) => ({
      ...product,
      category: getCategoryNameById(product.category_id),
      href: `/product/${product.id}`,
    }));

    res.send(new MetaView(factory({ products }), createMetaData({ head: { title: 'HOME' } })).toHtml());
  };
};

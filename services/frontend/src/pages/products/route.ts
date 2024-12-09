import { MetaView } from '@rune-ts/server';
import { type Product } from '@monorepo/shared';
import { ProductDetailPage } from './detail/page';
import type { RenderHandlerType } from '../../types/common';
import { getProductByIdSS } from '../../lib/api';
import { convertURLtoFile, createMetaData, getCategoryNameById, takeOne } from '../../lib/utils';
import { HomePage } from '../home/page';

export const productRouter = {
  ['/product']: HomePage,
  ['/product/:id']: ProductDetailPage,
};

export const productDetailHanlder: RenderHandlerType<typeof ProductDetailPage> = (factory) => {
  return async (req, res) => {
    const product = await getProductByIdSS(parseInt(req.params.id!)).then((result): Product => result.data);
    const thumbnail = await convertURLtoFile(product.thumbnail);

    res.send(
      new MetaView(
        factory({
          ...product,
          category: getCategoryNameById(product.category_id),
          thumbnailUrl: product.thumbnail,
          thumbnail,
        }),
        createMetaData({ head: { title: 'PRODUCT DETAIL' } }),
      ).toHtml(),
    );
  };
};

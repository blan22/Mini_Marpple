import { MetaView } from '@rune-ts/server';
import { type Product } from '@monorepo/shared';
import { ProductPage } from './page';
import { ProductDetailPage } from './detail/page';
import type { RenderHandlerType } from '../../types/common';
import { getProductByIdSS, getProductsByQuerySS } from '../../lib/api';
import { convertURLtoFile, createMetaData, getCategoryNameById, takeOne } from '../../lib/utils';

export const productRouter = {
  ['/product']: ProductPage,
  ['/product/:id']: ProductDetailPage,
};

export const productHanlder: RenderHandlerType<typeof ProductPage> = (factory) => {
  return async (_, res) => {
    const result = await getProductsByQuerySS();
    const products: (Product & { href: string })[] = result.data?.map((product) => ({
      ...product,
      category: getCategoryNameById(product.category_id),
      href: `/product/${product.id}`,
    }));

    res.send(new MetaView(factory({ products }), createMetaData({ head: { title: 'PRODUCT' } })).toHtml());
  };
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

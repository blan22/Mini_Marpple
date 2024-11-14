import { MetaView, app, type LayoutData } from '@rune-ts/server';
import shared, { type Product } from '@monorepo/shared';
import favicon from '../../../public/favicon.png';
import { ClientRouter } from '../router';
import { getProductById, getProductsByQuery } from '../../lib/api';
import { convertURLtoFile } from '../../lib/utils';

const server = app();

server.get(ClientRouter['/'].toString(), async function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'HOME',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  const result = await getProductsByQuery();
  const products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[] = result.data?.map(
    (product) => ({
      ...product,
      category: shared.getCategoryNameById(product.category_id),
      href: `/product/${product.id}`,
    }),
  );

  res.locals.layoutData = layoutData;
  res.send(new MetaView(ClientRouter['/']({ products }, { test: true }), res.locals.layoutData).toHtml());
});

server.get(ClientRouter['/product'].toString(), async function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'PRODUCTS',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };

  const result = await getProductsByQuery();
  const products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[] = result.data?.map(
    (product) => ({
      ...product,
      category: shared.getCategoryNameById(product.category_id),
      href: `/product/${product.id}`,
    }),
  );

  res.locals.layoutData = layoutData;
  res.send(new MetaView(ClientRouter['/product']({ products }), res.locals.layoutData).toHtml());
});

server.get(ClientRouter['/product/:id'].toString(), async function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'ADMIN PRODUCT UPDATE',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;

  const result = await getProductById(parseInt(req.params.id!));
  const product = shared.takeOne(result.data);
  const thumbnail = await convertURLtoFile(product.thumbnail);

  res.send(
    new MetaView(
      ClientRouter['/product/:id']({ ...product, thumbnail_url: product.thumbnail, thumbnail }),
      res.locals.layoutData,
    ).toHtml(),
  );
});

server.get(ClientRouter['/admin'].toString(), async function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'ADMIN',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  const result = await getProductsByQuery();
  const products: (Omit<Product, 'thumbnail'> & { href: string; thumbnail: string })[] = result.data?.map(
    (product) => ({
      ...product,
      category: shared.getCategoryNameById(product.category_id),
      href: `/admin/${product.id}`,
    }),
  );

  res.locals.layoutData = layoutData;
  res.send(new MetaView(ClientRouter['/admin']({ products }), res.locals.layoutData).toHtml());
});

server.get(ClientRouter['/admin/create'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'ADMIN PRODUCT CREATE',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;
  res.send(
    new MetaView(
      ClientRouter['/admin/create']({ name: null, thumbnail: null, category: null, price: null, stock: null }),
      res.locals.layoutData,
    ).toHtml(),
  );
});

server.get(ClientRouter['/admin/:id'].toString(), async function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'ADMIN PRODUCT UPDATE',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;

  const result = await getProductById(parseInt(req.params.id!));
  const product = shared.takeOne(result.data);
  const thumbnail = await convertURLtoFile(product.thumbnail);

  res.send(
    new MetaView(
      ClientRouter['/admin/:id']({ ...product, thumbnail_url: product.thumbnail, thumbnail }),
      res.locals.layoutData,
    ).toHtml(),
  );
});

server.get(ClientRouter['/@/cart'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'CART',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;
  res.send(
    new MetaView(ClientRouter['/@/cart']({ name: '', price: 100 }, { test: true }), res.locals.layoutData).toHtml(),
  );
});

server.get(ClientRouter['/@/orders'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'ORDERS',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;
  res.send(
    new MetaView(ClientRouter['/@/orders']({ name: '', price: 100 }, { test: true }), res.locals.layoutData).toHtml(),
  );
});

server.get(ClientRouter['/login'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: 'LOGIN',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;
  res.send(
    new MetaView(ClientRouter['/login']({ name: '', price: 100 }, { test: true }), res.locals.layoutData).toHtml(),
  );
});

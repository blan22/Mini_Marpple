import { MetaView, app, type LayoutData } from '@rune-ts/server';
import type { Product } from '@monorepo/shared';
import favicon from '../../../public/favicon.png';

import { ClientRouter } from '../router';

const server = app();

server.get(ClientRouter['/'].toString(), function (req, res) {
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
  res.locals.layoutData = layoutData;
  res.send(new MetaView(ClientRouter['/']({ name: '', price: 100 }, { test: true }), res.locals.layoutData).toHtml());
});

server.get(ClientRouter['/products'].toString(), function (req, res) {
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
  res.locals.layoutData = layoutData;
  res.send(
    new MetaView(ClientRouter['/products']({ name: '', price: 100 }, { test: true }), res.locals.layoutData).toHtml(),
  );
});

server.get(ClientRouter['/admin'].toString(), function (req, res) {
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
  const products: (Omit<Product, 'thumbnail'> & { href: string })[] = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    name: `product${index + 1}`,
    price: 100,
    stock: 10,
    category: 'goods',
    createAt: new Date(),
    updateAt: new Date(),
    href: `/admin/${index}`,
  }));

  res.locals.layoutData = layoutData;
  res.send(new MetaView(ClientRouter['/admin']({ products }, { test: true }), res.locals.layoutData).toHtml());
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

server.get(ClientRouter['/admin/:id'].toString(), function (req, res) {
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
  const product = {};
  res.send(
    new MetaView(
      ClientRouter['/admin/:id']({ name: null, thumbnail: null, category: null, price: null, stock: null }),
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

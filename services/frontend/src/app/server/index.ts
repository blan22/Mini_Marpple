import { MetaView, app, type LayoutData } from '@rune-ts/server';
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

import { app } from '@rune-ts/server';
import { ClientRouter } from '../router';
import { ensureAuthenticatedMiddleware, errorBoundaryMiddleware } from '../../lib/middleware';
import { cartHandler, orderHandler } from '../../pages/@/route';
import { adminProductCreateHanlder, adminProductHanlder, adminProductUpdateHandler } from '../../pages/admin/route';
import { productDetailHanlder, productHanlder } from '../../pages/products/route';
import { homeHandler } from '../../pages/home/route';
import { loginHandler } from '../../pages/login/route';
import { notFoundHandler } from '../../pages/error/route';

const server = app();

server.get(ClientRouter['/'].toString(), errorBoundaryMiddleware(homeHandler(ClientRouter['/'])));

server.get(ClientRouter['/product'].toString(), errorBoundaryMiddleware(productHanlder(ClientRouter['/product'])));

server.get(
  ClientRouter['/product/:id'].toString(),
  errorBoundaryMiddleware(productDetailHanlder(ClientRouter['/product/:id'])),
);

server.get(ClientRouter['/admin'].toString(), errorBoundaryMiddleware(adminProductHanlder(ClientRouter['/admin'])));

server.get(
  ClientRouter['/admin/create'].toString(),
  ensureAuthenticatedMiddleware,
  adminProductCreateHanlder(ClientRouter['/admin/create']),
);

server.get(
  ClientRouter['/admin/:id'].toString(),
  ensureAuthenticatedMiddleware,
  errorBoundaryMiddleware(adminProductUpdateHandler(ClientRouter['/admin/:id'])),
);

server.get(
  ClientRouter['/@/cart'].toString(),
  ensureAuthenticatedMiddleware,
  errorBoundaryMiddleware(cartHandler(ClientRouter['/@/cart'])),
);

server.get(
  ClientRouter['/@/order'].toString(),
  ensureAuthenticatedMiddleware,
  errorBoundaryMiddleware(orderHandler(ClientRouter['/@/order'])),
);

server.get(ClientRouter['/login'].toString(), loginHandler(ClientRouter['/login']));

server.use(notFoundHandler(ClientRouter['/404']));

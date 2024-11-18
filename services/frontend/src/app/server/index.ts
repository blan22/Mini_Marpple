import { app } from '@rune-ts/server';
import { ClientRouter } from '../router';
import { ensureAuthenticatedMiddleware } from '../../lib/middleware';
import { cartHandler, orderHandler } from '../../pages/@/route';
import { adminProductCreateHanlder, adminProductHanlder, adminProductUpdateHandler } from '../../pages/admin/route';
import { productDetailHanlder, productHanlder } from '../../pages/products/route';
import { homeHandler } from '../../pages/home/route';
import { loginHandler } from '../../pages/login/route';
import { notFoundHandler } from '../../pages/error/route';

const server = app();

server.get(ClientRouter['/'].toString(), homeHandler(ClientRouter['/']));

server.get(ClientRouter['/product'].toString(), productHanlder(ClientRouter['/product']));

server.get(ClientRouter['/product/:id'].toString(), productDetailHanlder(ClientRouter['/product/:id']));

server.get(ClientRouter['/admin'].toString(), adminProductHanlder(ClientRouter['/admin']));

server.get(
  ClientRouter['/admin/create'].toString(),
  ensureAuthenticatedMiddleware,
  adminProductCreateHanlder(ClientRouter['/admin/create']),
);

server.get(
  ClientRouter['/admin/:id'].toString(),
  ensureAuthenticatedMiddleware,
  adminProductUpdateHandler(ClientRouter['/admin/:id']),
);

server.get(ClientRouter['/@/cart'].toString(), ensureAuthenticatedMiddleware, cartHandler(ClientRouter['/@/cart']));

server.get(ClientRouter['/@/order'].toString(), ensureAuthenticatedMiddleware, orderHandler(ClientRouter['/@/order']));

server.get(ClientRouter['/login'].toString(), loginHandler(ClientRouter['/login']));

// @ts-ignore
server.get(notFoundHandler(ClientRouter['/404']));

server.use((error, req, res, next) => {});

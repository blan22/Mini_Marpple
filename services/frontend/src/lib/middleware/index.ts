import { MetaView } from '@rune-ts/server';
import type { RequestHandler } from 'express';
import { getSessionSS } from '../api/member/queries';
import { ClientRouter } from '../../app/router';
import { createMetaData } from '../utils';

const ensureAuthenticatedMiddleware: RequestHandler = async (req, res, next) => {
  const session = await getSessionSS(req);

  if (session?.data?.id) return next();

  res.send(new MetaView(ClientRouter['/need_login']({}), createMetaData({ head: { title: 'NEED LOGIN' } })).toHtml());
};

const unlessAuthenticatedMiddleware = () => {};

export { ensureAuthenticatedMiddleware };

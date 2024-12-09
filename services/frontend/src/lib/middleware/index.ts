import { MetaView } from '@rune-ts/server';
import type { RequestHandler } from 'express';
import { getSessionSS } from '../api/member/queries';
import { ClientRouter } from '../../app/router';
import { createMetaData } from '../utils';
import type { HttpError } from '../httpError';

const ensureAuthenticatedMiddleware: RequestHandler = async (req, res, next) => {
  const session = await getSessionSS(req);

  if (session?.data?.id) return next();

  res.send(new MetaView(ClientRouter['/need_login']({}), createMetaData({ head: { title: 'NEED LOGIN' } })).toHtml());
};

const unlessAuthenticatedMiddleware = () => {};

const errorBoundaryMiddleware = (factory): RequestHandler => {
  return async (req, res, next) => {
    factory(req, res, next).catch((error: HttpError) => {
      res
        .status(500)
        .send(
          new MetaView(
            ClientRouter['/internal_error']({ error: error.message }),
            createMetaData({ head: { title: 'SERVER ERROR' } }),
          ).toHtml(),
        );
    });
  };
};

export { ensureAuthenticatedMiddleware, unlessAuthenticatedMiddleware, errorBoundaryMiddleware };

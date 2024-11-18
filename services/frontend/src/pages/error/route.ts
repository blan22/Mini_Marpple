import { MetaView } from '@rune-ts/server';
import { NotFoundPage } from './not_found';
import { NeedLoginPage } from './need_login';
import type { RenderHandlerType } from '../../types/common';
import { createMetaData } from '../../lib/utils';

export const errorRouter = {
  ['/404']: NotFoundPage,
  ['/need_login']: NeedLoginPage,
};

export const notFoundHandler: RenderHandlerType<typeof NotFoundPage> = (factory) => {
  return (_, res) => {
    res.status(404).send(new MetaView(factory({}), createMetaData({ head: { title: '404 NOT FOUND' } })).toHtml());
  };
};

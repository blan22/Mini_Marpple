import { MetaView } from '@rune-ts/server';
import { LoginPage } from './page';
import type { RenderHandlerType } from '../../types/common';
import { createMetaData } from '../../lib/utils';

export const loginRouter = {
  ['/login']: LoginPage,
};

export const loginHandler: RenderHandlerType<typeof LoginPage> = (factory) => {
  return (_, res) => {
    res.send(new MetaView(factory({}), createMetaData({ head: { title: 'LOGIN' } })).toHtml());
  };
};

import type { RenderHandler } from '@rune-ts/server';
import { type Express } from 'express';
import { Page } from 'rune-ts';

interface ServerResponse<T> {
  message: string;
  data: T;
}

type RequiredByKey<T, Keys extends keyof T> = Required<Pick<T, Keys>> & Pick<T, Exclude<keyof T, Keys>>;

type RenderHandlerType<
  RunePage extends typeof Page<object>,
  ReqQuery = Record<string, string>,
  P = Record<any, any>,
  Locals extends Record<string, any> = Record<string, any>,
> = RenderHandler<RunePage, P, ReqQuery, Record<string, any>, RequiredByKey<Locals, 'sharedData'> & Locals>;

export type { ServerResponse, RequiredByKey, RenderHandlerType };

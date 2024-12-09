import shared from '@monorepo/shared';
import { RequestHandler } from 'express';

const zodMiddleware = <T extends shared.ZodObject<any, any>>(schema: T) => {
  const func: RequestHandler = (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      res.status(405).json({ message: '형식에 맞춰 보내주세요' });
    }
  };
  return func;
};

export { zodMiddleware };

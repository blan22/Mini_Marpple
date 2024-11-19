import { type RequestHandler } from 'express';

const webhook: RequestHandler = (req, res) => {
  res.status(200).json({ message: '' });
};

export { webhook };

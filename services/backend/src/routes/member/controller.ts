import type { RequestHandler } from 'express';

const login: RequestHandler = async (req, res) => {
  res.json({ messsage: 'success', data: {} }).status(200);
};

export { login };

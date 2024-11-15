import type { RequestHandler } from 'express';

const login: RequestHandler = async (req, res) => {
  res.status(200).json({ message: '로그인 성공' });
};

const getSession: RequestHandler = async (req, res) => {
  res.status(200).json({ message: '' });
};

export { login, getSession };

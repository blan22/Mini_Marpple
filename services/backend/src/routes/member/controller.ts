import type { RequestHandler } from 'express';

const login: RequestHandler = async (req, res) => {
  res.status(200).json({ message: '로그인 성공' });
};

const getSession: RequestHandler = async (req, res) => {
  res.status(200).json({ message: '유저 정보 조회에 성공했습니다.', data: req.user });
};

export { login, getSession };

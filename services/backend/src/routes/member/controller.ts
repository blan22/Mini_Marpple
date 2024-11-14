import type { RequestHandler } from 'express';

const login: RequestHandler = async (req, res) => {
  res.status(200).json({ message: '로그인 성공' });
};

const getSession: RequestHandler = async (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: '' });
};

export { login, getSession };

// 어드민, 메인 리스트 페이지
// 카트 페이지
// 주문 내역 페이지

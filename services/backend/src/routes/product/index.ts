import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'product get route..!' });
});

export default router;

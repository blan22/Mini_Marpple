import express from 'express';
import product from './product';
import member from './member';

const router = express.Router();

router.use('/product', product);

router.use('/member', member);

export default router;

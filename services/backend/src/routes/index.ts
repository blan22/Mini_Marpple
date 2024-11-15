import express from 'express';
import product from './product';
import member from './member';
import cart from './cart';

const router = express.Router();

router.use('/product', product);

router.use('/member', member);

router.use('/cart', cart);

export default router;

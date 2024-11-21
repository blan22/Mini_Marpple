import express from 'express';
import product from './product';
import member from './member';
import cart from './cart';
import order from './order';

const router = express.Router();

router.use('/product', product);

router.use('/member', member);

router.use('/cart', cart);

router.use('/order', order);

export default router;

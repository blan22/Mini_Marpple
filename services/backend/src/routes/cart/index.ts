import express from 'express';
import shared from '@monorepo/shared';
import * as cartController from './controller';
import { ensureAuthMiddleware } from '../../shared/passport';
import { zodMiddleware } from '../../shared/zod';

const router = express.Router();

router.route('/').all(ensureAuthMiddleware).get(cartController.getCart).post(cartController.addProductToCart);

router
  .route('/:id')
  .all(ensureAuthMiddleware)
  .patch(zodMiddleware(shared.CartProductQuantityUpdateSchema), cartController.updateCartProduct)
  .delete(cartController.deleteCartProduct);

export default router;

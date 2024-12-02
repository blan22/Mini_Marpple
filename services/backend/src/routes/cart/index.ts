import express from 'express';
import shared from '@monorepo/shared';
import * as cartController from './controller';
import { ensureAuthMiddleware } from '../../shared/passport';
import { zodMiddleware } from '../../shared/zod';
import { errorBoundary } from '../../shared/error';

const router = express.Router();

router
  .route('/')
  .all(ensureAuthMiddleware)
  .get(errorBoundary(cartController.getCart))
  .post(errorBoundary(cartController.createCartProduct));

router
  .route('/:id')
  .all(ensureAuthMiddleware)
  .patch(zodMiddleware(shared.CartProductQuantityUpdateSchema), errorBoundary(cartController.updateCartProduct))
  .delete(errorBoundary(cartController.deleteCartProduct));

export default router;

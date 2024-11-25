import express from 'express';
import { ensureAuthMiddleware } from '../../shared/passport';
import * as orderController from './controller';
import { errorBoundary } from '../../shared/error';

const router = express.Router();

router
  .route('/')
  .all(ensureAuthMiddleware)
  .get(errorBoundary(orderController.findByAll))
  .delete(errorBoundary(orderController.cancel));

router.route('/webhook').post(errorBoundary(orderController.webhook));

router.route('/:id').all(ensureAuthMiddleware).get(errorBoundary(orderController.findById));

export default router;
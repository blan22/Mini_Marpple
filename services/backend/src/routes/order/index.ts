import express from 'express';
import { ensureAuthMiddleware } from '../../shared/passport';
import * as orderController from './controller';
import { errorBoundary } from '../../shared/error';

const router = express.Router();

router
  .route('/')
  .all(ensureAuthMiddleware)
  .get(errorBoundary(orderController.getOrders))
  .post(errorBoundary(orderController.createOrder))
  .delete(errorBoundary(orderController.deleteOrder));

router.route('/webhook').post(errorBoundary(orderController.webhook));

router.route('/:id').all(ensureAuthMiddleware).get(errorBoundary(orderController.getOrder));

export default router;

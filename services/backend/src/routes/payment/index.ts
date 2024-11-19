import express from 'express';
import { ensureAuthMiddleware } from '../../shared/passport';
import * as paymentController from './controller';

const router = express.Router();

router.route('/').all(ensureAuthMiddleware);

router.route('/webhook').post(paymentController.webhook);

export default router;

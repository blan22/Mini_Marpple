import shared from '@monorepo/shared';
import express from 'express';
import * as productController from './controller';
import { uploadMiddleware } from '../../shared/multer';
import { zodMiddleware } from '../../shared/zod';
import { ensureAuthMiddleware } from '../../shared/passport';
import { errorBoundary } from '../../shared/error';

const router = express.Router();

router
  .route('/')
  .get(errorBoundary(productController.findByQuery))
  .post(
    ensureAuthMiddleware,
    uploadMiddleware,
    zodMiddleware(shared.CreateProductSchema.omit({ thumbnail: true })),
    errorBoundary(productController.create),
  );

router
  .route('/:id')
  .get(productController.findById)
  .patch(
    ensureAuthMiddleware,
    uploadMiddleware,
    zodMiddleware(shared.UpdateProductSchema.omit({ thumbnail: true })),
    errorBoundary(productController.update),
  );

export default router;

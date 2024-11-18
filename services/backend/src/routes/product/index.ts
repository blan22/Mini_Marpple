import express from 'express';
import shared from '@monorepo/shared';
import * as productController from './controller';
import { uploadMiddleware } from '../../shared/multer';
import { zodMiddleware } from '../../shared/zod';
import { ensureAuthMiddleware } from '../../shared/passport';

const router = express.Router();

router
  .route('/')
  .get(productController.findByQuery)
  .post(
    ensureAuthMiddleware,
    uploadMiddleware,
    zodMiddleware(shared.CreateProductSchema.omit({ thumbnail: true })),
    productController.create,
  );

router
  .route('/:id')
  .get(productController.findById)
  .patch(
    ensureAuthMiddleware,
    uploadMiddleware,
    zodMiddleware(shared.UpdateProductSchema.omit({ thumbnail: true })),
    productController.update,
  );

export default router;

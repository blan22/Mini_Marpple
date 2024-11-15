import express from 'express';
import shared from '@monorepo/shared';
import * as productController from './controller';
import { uploadMiddleware } from '../../shared/multer';
import { zodMiddleware } from '../../shared/zod';

const router = express.Router();

router
  .route('/')
  .get(productController.findByQuery)
  .post(
    uploadMiddleware,
    zodMiddleware(shared.CreateProductSchema.omit({ thumbnail: true })),
    productController.create,
  );

router
  .route('/:id')
  .get(productController.findById)
  .patch(
    uploadMiddleware,
    zodMiddleware(shared.UpdateProductSchema.omit({ thumbnail: true })),
    productController.update,
  );

export default router;

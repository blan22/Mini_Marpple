import express from 'express';
import shared from '@monorepo/shared';
import * as productController from './controller';
import { uploadMiddleware } from '../../shared/multer';
import { zodMiddleware } from '../../shared/zod';

const router = express.Router();

router.get('/', productController.findByQuery);

router.post(
  '/',
  uploadMiddleware,
  zodMiddleware(shared.CreateProductSchema.omit({ thumbnail: true })),
  productController.create,
);

router.get('/:id', productController.findById);

router.patch('/:id', uploadMiddleware, productController.update);

export default router;

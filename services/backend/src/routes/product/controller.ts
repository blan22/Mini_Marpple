import { type RequestHandler } from 'express';
import POOL from '../../shared/db';
import * as productService from './service';
import { createThumnbnailUrl, paging } from '../../shared/utils';

const findById: RequestHandler<{ id: string }> = async (req, res) => {
  const result = await productService.findById(parseInt(req.params.id));
  res.json({ messsage: 'success', data: result }).status(200);
};

const findByQuery: RequestHandler<{}, {}, {}, { page: string; limit: string }> = async (req, res) => {
  const { limit, offset } = paging(parseInt(req.query?.page), parseInt(req.query?.limit));
  const result = await productService.findByQuery(offset, limit);
  res.json({ message: 'success', data: result }).status(200);
};

const create: RequestHandler = async (req, res) => {
  const product = { ...req.body, thumbnail: createThumnbnailUrl(req.file?.filename) };

  const transaction = await POOL.TRANSACTION();
  try {
    const result = await productService.create(product, transaction);
    await transaction.COMMIT();
    res.json({ message: 'success', data: result }).status(200);
  } catch (error) {
    await transaction.ROLLBACK();
    res.json({ message: 'error' }).status(502);
  }
};

const update: RequestHandler<{ id: string }> = async (req, res) => {
  const product = { ...req.body, thumbnail: createThumnbnailUrl(req.file?.filename) };

  const transaction = await POOL.TRANSACTION();
  try {
    const result = await productService.update(parseInt(req.params.id), product, transaction);
    await transaction.COMMIT();
    res.json({ message: 'success', data: result }).status(200);
  } catch (error) {
    await transaction.ROLLBACK();
    res.json({ message: 'error' }).status(502);
  }
};

export { findById, findByQuery, create, update };

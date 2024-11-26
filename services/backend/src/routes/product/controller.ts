import { type RequestHandler } from 'express';
import POOL from '../../shared/db';
import * as productService from './service';
import { createThumnbnailUrl, getCategoryIdByQuery, paging } from '../../shared/utils';

const findById: RequestHandler<{ id: string }> = async (req, res) => {
  const result = await productService.findById(parseInt(req.params.id));
  res.json({ messsage: 'success', data: result }).status(200);
};

const findByQuery: RequestHandler<{}, {}, {}, { page: string; limit: string; category: string }> = async (req, res) => {
  const { page = '1', limit: qLimit = '10', category = undefined } = req.query;
  const { offset, limit } = paging(parseInt(page), parseInt(qLimit));

  const result = await productService.findByQuery(offset, limit, getCategoryIdByQuery(category));
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
  const { thumbnail_url, ...rest } = req.body;
  const product = {
    ...rest,
    thumbnail: thumbnail_url ? thumbnail_url : createThumnbnailUrl(req.file?.filename),
  };

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

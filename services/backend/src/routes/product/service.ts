import * as productRepository from './repository';
import * as categoryRepository from '../category/repository';
import type { CreateProduct } from '../../types/product';

const findByQuery = (offset: number, limit: number) => {
  return productRepository.findByQuery(offset, limit);
};

const findById = (id: number) => {
  return productRepository.findById(id);
};

const create = async (data: CreateProduct, transaction: any) => {
  const { category, ...rest } = data;
  const categoryIds = await categoryRepository.findByName(category);
  return await productRepository.create({ ...rest, category_id: categoryIds[0].id }, transaction);
};

const update = async (id: number, data: CreateProduct & { thumbnail_url?: string }, transaction: any) => {
  const { category, thumbnail_url, ...rest } = data;
  const categoryIds = await categoryRepository.findByName(category);
  return await productRepository.update(
    id,
    { ...rest, category_id: categoryIds[0].id, thumbnail: thumbnail_url ? thumbnail_url : rest.thumbnail },
    transaction,
  );
};

export { findByQuery, findById, create, update };

import * as productRepository from './repository';
import * as categoryRepository from '../category/repository';
import type { CreateProduct } from '../../types/product';
import { getCategoryIdByQuery } from '../../shared/utils';

const findByQuery = async (offset: number, limit: number, category_id: ReturnType<typeof getCategoryIdByQuery>) => {
  const products = await productRepository.findByQuery(offset, limit, category_id);
  const count = await productRepository.count(category_id);

  return { products, total: Math.ceil(count / limit) };
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

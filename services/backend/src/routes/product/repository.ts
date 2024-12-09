import shared, { type Product } from '@monorepo/shared';
import POOL from '../../shared/db';
import { CreateProduct } from '../../types/product';
import { getCategoryIdByQuery } from '../../shared/utils';
import { head, pipe } from '@fxts/core';

const findById = (id: number): Promise<Product> => {
  return POOL.QUERY`
    SELECT * 
    FROM products
    WHERE id = ${id}
  `.then((result: Product[]) => shared.takeOne(result));
};

const findByQuery = (offset: number, limit: number, category_id: ReturnType<typeof getCategoryIdByQuery>) => {
  if (category_id)
    return POOL.QUERY`
  SELECT *
  FROM products
  WHERE ${POOL.EQ({ category_id })}
  ORDER BY created_at DESC
  LIMIT ${limit}
  OFFSET ${offset}
`;

  return POOL.QUERY`
  SELECT *
  FROM products
  ORDER BY created_at DESC
  LIMIT ${limit} OFFSET ${offset}
`;
};

const create = async (data: Omit<CreateProduct, 'category'> & { category_id: number }, transaction: any) => {
  return await transaction.QUERY`INSERT INTO products ${transaction.VALUES(data)}`;
};

const update = async (
  id: number,
  data: Omit<CreateProduct, 'category'> & { category_id: number },
  transaction: any,
) => {
  return await transaction.QUERY`
    UPDATE products
    ${transaction.SET({
      ...data,
      updated_at: new Date(),
    })}
    WHERE id = ${id}
    RETURNING *
  `;
};

const increase = (product_id: number, quantity: number, transaction?: any) => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
    UPDATE products
    SET stock = stock + ${quantity}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${product_id}
  `;
};

const decrease = (product_id: number, quantity: number, transaction?: any) => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
    UPDATE products
    SET stock = stock - ${quantity}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${product_id}
  `;
};

const count = (category_id: ReturnType<typeof getCategoryIdByQuery>) => {
  if (category_id)
    return POOL.QUERY`
  SELECT COUNT(*) as total
  FROM products
  WHERE ${POOL.EQ({ category_id })}
`.then((item: { total: string }[]) => pipe(item, head, (item) => parseInt(item?.total ?? '0')));

  return POOL.QUERY`
  SELECT COUNT(*) as total
  FROM products
`.then((item: { total: string }[]) => pipe(item, head, (item) => parseInt(item?.total ?? '0')));
};

export { create, update, findById, findByQuery, increase, decrease, count };

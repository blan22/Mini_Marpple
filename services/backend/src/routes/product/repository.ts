import POOL from '../../shared/db';
import { CreateProduct } from '../../types/product';

const findById = (id: number) => {
  return POOL.QUERY`
    SELECT * 
    FROM products
    WHERE id = ${id}
  `;
};

const findByQuery = (offset: number, limit: number) => {
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

export { create, update, findById, findByQuery };

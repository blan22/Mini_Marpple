import shared, { type Product } from '@monorepo/shared';
import POOL from '../../shared/db';
import { CreateProduct } from '../../types/product';

const findById = (id: number): Promise<Product> => {
  return POOL.QUERY`
    SELECT * 
    FROM products
    WHERE id = ${id}
  `.then((result: Product[]) => shared.takeOne(result));
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

export { create, update, findById, findByQuery, increase, decrease };

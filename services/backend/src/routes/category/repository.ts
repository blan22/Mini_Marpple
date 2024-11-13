import POOL from '../../shared/db';
import type { CreateProduct } from '../../types/product';

const findByName = (name: CreateProduct['category']): Promise<{ id: number }[]> => {
  return POOL.QUERY`
    SELECT id 
    FROM categories 
    WHERE name = ${name}
  `;
};

export { findByName };

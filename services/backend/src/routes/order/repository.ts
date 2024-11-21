import shared, { type RequestOrder, type OrderProduct, type Order } from '@monorepo/shared';
import POOL from '../../shared/db';

const findById = (payment_id: string): Promise<Order> => {
  return POOL.QUERY`
    SELECT * 
    FROM orders
    WHERE payment_id = ${payment_id}
  `.then((result: Order[]) => shared.takeOne(result));
};

const findOrderProductById = (order_id: number): Promise<OrderProduct[]> => {
  return POOL.QUERY`
    SELECT * 
    FROM order_product
    WHERE order_id = ${order_id}
  `;
};

const create = (
  data: Omit<RequestOrder, 'cart_id' | 'order_name' | 'payment_method'> & {
    user_id: number;
    name: string;
    status: string;
  },
  transaction: any,
): Promise<Order> => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
    INSERT INTO orders ${wPOOL.VALUES(data)}
    RETURNING *
  `.then((result: Order[]) => shared.takeOne(result));
};

const createOrderProduct = (data: Omit<OrderProduct, 'create_at' | 'update_at' | 'id'>, transaction: any) => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
    INSERT INTO order_product ${wPOOL.VALUES(data)}
`;
};

const update = (order_id: number, data: Partial<Order>, transaction: any) => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
    UPDATE orders
    ${wPOOL.SET({
      ...data,
      updated_at: new Date(),
    })}
    WHERE id = ${order_id}
    RETURNING *
  `;
};

const remove = async (transaction: any) => {
  const wPOOL = transaction || POOL;

  await wPOOL.QUERY`DELETE FROM orders`;
};

export { findById, findOrderProductById, create, createOrderProduct, update, remove };

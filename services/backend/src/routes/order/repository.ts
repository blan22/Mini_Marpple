import shared, { type RequestOrder, type OrderProduct, type Order, Product } from '@monorepo/shared';
import POOL from '../../shared/db';
import { head, pipe } from '@fxts/core';

const findById = (payment_id: string): Promise<Order> => {
  return POOL.QUERY`
    SELECT * 
    FROM orders
    WHERE payment_id = ${payment_id}
  `.then((result: Order[]) => shared.takeOne(result));
};

const findByQuery = ({
  user_id,
  limit,
  offset,
  status,
}: {
  user_id: number;
  limit: number;
  offset: number;
  status?: Order['status'];
}) => {
  const STATUS = status ? POOL.EQ({ user_id, status }) : POOL.EQ({ user_id });
  return POOL.ASSOCIATE`
    orders ${POOL.SQL`WHERE ${STATUS} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`}
      < order_product
        - product
  `.then(
    (
      orders: (Order & {
        _: {
          order_product: (OrderProduct & {
            _: {
              product: Product;
            };
          })[];
        };
      })[],
    ) =>
      orders.map((order) => ({
        ...order,
        _: null,
        order_products: order._.order_product.map((order_product) => ({
          ...order_product,
          _: null,
          product: order_product._.product,
        })),
      })),
  );
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

const remove = async (order_id: number, transaction: any) => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
  DELETE FROM orders
  WHERE id = ${order_id}
  `;
};

const count = (user_id: number, status?: Order['status']) => {
  const STATUS = status ? POOL.EQ({ user_id, status }) : POOL.EQ({ user_id });

  return POOL.QUERY`
  SELECT COUNT(*) as total
  FROM orders
  WHERE ${STATUS}
`.then((item: { total: string }[]) => pipe(item, head, (item) => parseInt(item?.total ?? '0')));
};

export { findById, findByQuery, findOrderProductById, create, createOrderProduct, update, remove, count };

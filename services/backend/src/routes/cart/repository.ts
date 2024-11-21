import POOL from '../../shared/db';
import shared, { type Cart, type CartProduct, type Product } from '@monorepo/shared';

const findCartById = async (
  user_id: number,
): Promise<
  Cart & {
    cart_product_items: (CartProduct & {
      product: Product;
    })[];
  }
> => {
  return POOL.ASSOCIATE`
    carts ${POOL.SQL`WHERE user_id = ${user_id}`}
      < cart_product ${{
        column: POOL.COLUMN('id', 'product_id', 'quantity'),
        query: POOL.SQL`ORDER BY created_at DESC`,
      }}
        - product
  `.then(
    (
      carts: (Cart & {
        _: {
          cart_product: (CartProduct & {
            _: {
              product: Product;
            };
          })[];
        };
      })[],
    ) =>
      shared.takeOne(
        carts.map((cart) => ({
          ...cart,
          _: null,
          cart_product_items: cart._.cart_product.map((item) => ({
            ...item,
            _: null,
            product: item._.product,
          })),
        })),
      ),
  );
};

const findCartProductById = (user_id: number, cart_product_id: number) => {
  return POOL.QUERY`
      SELECT cp.id 
      FROM cart_product cp
      JOIN carts c ON cp.cart_id = c.id
      WHERE cp.id = ${cart_product_id} AND c.user_id = ${user_id}
  `.then((data: { id: number }[]) => shared.takeOne(data));
};

const create = (data: { cart_id: number; product_id: number; quantity: number }) => {
  return POOL.QUERY`INSERT INTO cart_product ${POOL.VALUES(data)}`;
};

const increase = (cart_product_id: number, quantity: number) => {
  return POOL.QUERY`
    UPDATE cart_product
    SET quantity = quantity + ${quantity}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${cart_product_id}
  `;
};

const update = (cart_product_id: number, quantity: number) => {
  return POOL.QUERY`
    UPDATE cart_product
    SET quantity = ${quantity}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${cart_product_id}
  `;
};

const remove = (cart_product_id: number, transaction?: any) => {
  const wPOOL = transaction || POOL;

  return wPOOL.QUERY`
      DELETE FROM cart_product
      WHERE id = ${cart_product_id}
    `;
};

export { create, findCartById, findCartProductById, increase, update, remove };

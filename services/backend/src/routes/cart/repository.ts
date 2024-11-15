import POOL from '../../shared/db';
import shared, { type Cart, type CartProduct, type Product } from '@monorepo/shared';

const findById = async (
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

export { create, findById, increase, update };

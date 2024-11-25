import type { Order as OrderSchema, OrderProduct, Product } from '@monorepo/shared';

type Order = OrderSchema & {
  order_products: (OrderProduct & {
    product: Product;
  })[];
};

type Orders = Order[];

export type { Orders, Order };

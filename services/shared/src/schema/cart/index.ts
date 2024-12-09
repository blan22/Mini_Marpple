import { z } from 'zod';

const CartSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  create_at: z.string(),
  update_at: z.string(),
});

const CartProductSchema = z.object({
  id: z.number(),
  cart_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  create_at: z.string(),
  update_at: z.string(),
});

const CartProductQuantityUpdateSchema = z.object({
  quantity: z.number().or(z.string()).pipe(z.coerce.number()),
});

const CartProcessSchema = z.object({
  stock: z
    .number()
    .min(1, '수량은 최소 1개 이상 가능합니다.')
    .or(z.string())
    .pipe(z.coerce.number().min(1, '수량은 최소 1개 이상 가능합니다.')),
});

type Cart = z.infer<typeof CartSchema>;
type CartProcess = z.infer<typeof CartProcessSchema>;
type CartProduct = z.infer<typeof CartProductSchema>;
type CartProductQuantityUpdate = z.infer<typeof CartProductQuantityUpdateSchema>;

export { CartSchema, CartProcessSchema, CartProductSchema, CartProductQuantityUpdateSchema };
export type { Cart, CartProcess, CartProduct, CartProductQuantityUpdate };

import { z } from 'zod';

const OrderSchema = z.object({
  id: z.number(),
  name: z.string(),
  user_id: z.number(),
  total_price: z.string(),
  status: z.enum(['PENDING', 'CANCELED', 'SUCCESS']),
  payment_id: z.string(),
  payment_method: z.string(),
  create_at: z.date(),
  update_at: z.date(),
});

const OrderProductSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  create_at: z.date(),
  update_at: z.date(),
});

const CreateOrderSchema = z.object({
  agree: z
    .literal(true, { message: '약관에 동의해주세요.' })
    .or(z.literal('on', { message: '약관에 동의해주세요.' }))
    .pipe(z.coerce.boolean()),
  pay_method: z.enum(['CARD'], { message: '지불 방법을 정확하게 선택해주세요.' }),
});

const RequestOrderSchema = z.object({
  order_name: z.string(),
  payment_method: z.enum(['CARD']),
  payment_id: z.string(),
  total_price: z.number(),
  cart_id: z.number(),
});

const CancelOrderSchema = z.object({
  payment_id: z.string(),
  reason: z.string(),
});

type Order = z.infer<typeof OrderSchema>;
type CreateOrder = z.infer<typeof CreateOrderSchema>;
type RequestOrder = z.infer<typeof RequestOrderSchema>;
type OrderProduct = z.infer<typeof OrderProductSchema>;
type CancelOrder = z.infer<typeof CancelOrderSchema>;

export { CreateOrderSchema, RequestOrderSchema, OrderProductSchema, OrderSchema, CancelOrderSchema };
export type { CreateOrder, RequestOrder, OrderProduct, Order, CancelOrder };

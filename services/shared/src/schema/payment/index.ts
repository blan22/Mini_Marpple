import { z } from 'zod';

const OrderSchema = z.object({
  agree: z
    .literal(true, { message: '약관에 동의해주세요.' })
    .or(z.literal('on', { message: '약관에 동의해주세요.' }))
    .pipe(z.coerce.boolean()),
  pay_method: z.enum(['CARD'], { message: '지불 방법을 정확하게 선택해주세요.' }),
});

type Order = z.infer<typeof OrderSchema>;

export { OrderSchema };
export type { Order };

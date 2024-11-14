import { z } from 'zod';

const CartProcessSchema = z.object({
  stock: z
    .number()
    .min(1, '수량은 최소 1개 이상 가능합니다.')
    .or(z.string())
    .pipe(z.coerce.number().min(1, '수량은 최소 1개 이상 가능합니다.')),
});

type CartProcess = z.infer<typeof CartProcessSchema>;

export { CartProcessSchema };
export type { CartProcess };

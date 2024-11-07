import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ['image/png'];

const ProductSchema = z.object({
  id: z.number(),
  name: z.string().max(50).min(1),
  stock: z.number(),
  price: z.number(),
  category: z.enum(['cloth', 'goods', 'book', 'food']),
  thumbnail: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, '이미지 크기가 5mb를 초과했습니다.')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, '이미지는 png 포맷만 가능합니다.'),
  createAt: z.date(),
  updateAt: z.date(),
});

const CreateProductSchema = ProductSchema.pick({
  name: true,
  stock: true,
  price: true,
  category: true,
  thumbnail: true,
});

export { ProductSchema, CreateProductSchema };

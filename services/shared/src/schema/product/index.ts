import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const MIN_UPLOAD_SIZE = 1;
const ACCEPTED_FILE_TYPES = ['image/png'];

const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(2, '상품명은 최소 2글자 이상 입력해주세요.').max(50, '상품명은 최대 50글자까지 가능합니다.'),
  stock: z
    .number()
    .min(1, '수량은 최소 1개 이상 가능합니다.')
    .max(1000, '수량은 최대 1000개까지 가능합니다.')
    .or(z.string())
    .pipe(z.coerce.number().min(1, '수량은 최소 1개 이상 가능합니다.').max(1000, '수량은 최대 1000개까지 가능합니다.')),
  price: z
    .number()
    .min(100, '가격은 최소 100원 이상 가능합니다.')
    .max(10000000, '가격은 최대 1000만원까지 가능합니다.')
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .min(100, '가격은 최소 100원 이상 가능합니다.')
        .max(10000000, '가격은 최대 1000만원까지 가능합니다.'),
    ),
  category: z.enum(['cloth', 'goods', 'book', 'food'], { message: '카테고리 내 값을 선택해주세요.' }),
  thumbnail: z
    .instanceof(File, { message: '썸네일을 첨부해주세요.' })
    .refine((file) => {
      return !file || file.size >= MIN_UPLOAD_SIZE || file.size <= MAX_UPLOAD_SIZE;
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

type Product = z.infer<typeof ProductSchema>;

type CreateProduct = z.infer<typeof CreateProductSchema>;

export { ProductSchema, CreateProductSchema };
export type { Product, CreateProduct };

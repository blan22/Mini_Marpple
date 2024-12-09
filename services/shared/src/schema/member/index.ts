import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(2, '닉네임은 최소 2글자 이상 입력해주세요.').max(8, '닉네임은 최대 8글자까지 가능합니다.'),
  email: z.string().email('이메일 형식에 맞춰 입력해주세요.'),
  password: z
    .string()
    .min(8, '패스워드는 최소 8자리 이상 입력해주세요.')
    .max(20, '패스워드는 최대 20자리까지 가능합니다.'),
  created_at: z.string(),
  updated_at: z.string(),
});

const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

type User = z.infer<typeof UserSchema>;

type Login = z.infer<typeof LoginSchema>;

export { UserSchema, LoginSchema };
export type { User, Login };

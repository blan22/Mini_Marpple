import type { CreateProduct as ZCreateProduct } from '@monorepo/shared';

type CreateProduct = Omit<ZCreateProduct, 'thumbnail'> & { thumbnail: string };

export type { CreateProduct };

import { type Product } from '@monorepo/shared';

type AdminProductPageData = Omit<Product, 'thumbnail' | 'price'> & {
  thumbnail: File;
  thumbnailUrl: string;
  category: string;
  price: string;
};

export type { AdminProductPageData };

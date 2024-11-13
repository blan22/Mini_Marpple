interface ProductResponse {
  id: number;
  name: string;
  category_id: 1 | 2 | 3 | 4;
  price: string;
  stock: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

type AdminProductPageData = Omit<ProductResponse, 'thumbnail'> & { thumbnail: File; thumbnail_url: string };

export type { ProductResponse, AdminProductPageData };

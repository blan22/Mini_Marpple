import { type Product } from '@monorepo/shared';
import { http } from '../../fetcher';

const createProduct = (data: Product) => {
  const formData = new FormData();
  // @ts-ignore
  Object.entries(data).forEach(([key, value]) => formData.set(key, value));
  return http(`/api/product`, {
    method: 'POST',
    headers: {
      contentType: 'multipart/form-data',
    },
    credentials: 'include',
    body: formData,
  });
};

const updateProduct = (id: number, data: Product & { thumbnail_url?: string }) => {
  const formData = new FormData();
  Object.entries({ ...data, thumbnail: data.thumbnail_url ? null : data.thumbnail }).forEach(([key, value]) =>
    // @ts-ignore
    formData.set(key, value),
  );
  return http(`/api/product/${id}`, {
    method: 'PATCH',
    headers: {
      contentType: 'multipart/form-data',
    },
    credentials: 'include',
    body: formData,
  });
};

export { createProduct, updateProduct };

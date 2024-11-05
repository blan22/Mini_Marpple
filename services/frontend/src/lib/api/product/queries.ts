import { delay } from '@fxts/core';

const mockProducts = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    name: `product ${i + 1}`,
  }));
};

export const getProducts = () => {
  return delay(700, mockProducts());
};

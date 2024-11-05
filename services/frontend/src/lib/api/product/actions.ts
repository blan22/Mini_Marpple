import { delay } from '@fxts/core';

export const createProduct = () => {
  return delay(700, { message: 'product create success', status: 200 });
};

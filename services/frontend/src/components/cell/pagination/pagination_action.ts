import { View } from 'rune-ts';
import type { PaginationData } from '.';

abstract class PaginationAction extends View<PaginationData> {
  constructor(data: PaginationData) {
    super({ ...data });
  }

  isDisabled(_: PaginationData) {
    return true;
  }

  enabled(): void {}

  disabled(): void {}
}

export { PaginationAction };

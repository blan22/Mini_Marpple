import { View } from 'rune-ts';

abstract class Form<T extends object = {}> extends View<T> {
  get multiparts() {
    return {};
  }

  isMultiparts() {
    return false;
  }

  submit(data) {}
}

export { Form };

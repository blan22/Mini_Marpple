import { View } from 'rune-ts';

abstract class Form<T extends object = {}> extends View<T> {
  get multiparts() {
    return {};
  }

  isMultiparts() {
    return false;
  }

  disabled() {}

  submit(data) {}
}

export { Form };

import { $, View } from 'rune-ts';
import klass from './loading.module.scss';

interface LoadingData {}

class Loading extends View<LoadingData> {
  constructor() {
    super({});
  }

  private static _create() {
    $('body').append(
      $.fromHtml(`
        <div class="${klass.loading}">
          <div class="${klass.loading_circle}">
            <span></span>
          </div>
        </div>
        `),
    );
  }

  private static _remove() {
    $(`.${klass.loading}`).remove();
  }

  static start() {
    this._create();
  }

  static end() {
    this._remove();
  }
}

export { Loading };

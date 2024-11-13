import { html, on } from 'rune-ts';
import { type ZodObject } from '@monorepo/shared';
import {
  Form,
  ImageUploader,
  Select,
  Thumbnail,
  Typography,
  Range,
  Button,
  ChangeImageUploaderFileEvent,
  FormController,
  FormValidationErrorEvent,
  Message,
} from '../../components';
import klass from './create/page.module.scss';
import type { AdminProductPageData } from '../../types/product';

class AdminProductForm<T extends ZodObject<any, any>> extends Form<Partial<AdminProductPageData>> {
  protected _formController: FormController;
  protected _imageUploaderView: ImageUploader;
  protected _thumbnailView: Thumbnail;
  protected _messageView: Message;

  constructor(data: AdminProductPageData, schema: T) {
    super({ ...data });

    this._formController = new FormController(this, schema);
    this._imageUploaderView = new ImageUploader({ thumbnail: this.data.thumbnail }, { name: 'thumbnail' });
    this._thumbnailView = new Thumbnail({ url: this.data.thumbnail_url ? this.data.thumbnail_url : null });
    this._messageView = new Message({ text: '' });
  }

  override template() {
    return html`<form novalidate class="${klass.container}">
      <div class="${klass.left}">${this._thumbnailView}</div>
      <div class="${klass.right}">
        <input
          class="${klass.name}"
          value="${this.data.name}"
          name="name"
          type="text"
          placeholder="상품명을 입력해주세요."
        />
        ${this._imageUploaderView}
        ${new Select(
          {
            options: [
              { name: '옷', value: 'cloth' },
              { name: '굿즈', value: 'goods' },
              { name: '책', value: 'book' },
              { name: '음식', value: 'food' },
            ],
          },
          {
            name: 'category',
            defaultValue: this.data.category_id ? 'goods' : null,
          },
        )}
        <div class="${klass.stock}">
          ${new Typography({ text: '가격' })}
          ${new Range(
            {},
            {
              name: 'price',
              require: true,
              min: 100,
              max: 10000000,
              defaultValue: this.data.price ? parseInt(this.data.price) : 100,
            },
          )}
        </div>
        <div class="${klass.stock}">
          ${new Typography({ text: '수량' })}
          ${new Range({}, { name: 'stock', require: true, min: 0, max: 1000, defaultValue: this.data.stock ?? 0 })}
        </div>
        <div class="${klass.message}">${this._messageView}</div>
        ${new Button({ text: '등록' }, { variant: 'primary', type: 'submit' })}
      </div>
    </form>`;
  }

  override get multiparts() {
    return {
      thumbnail: this._imageUploaderView.data.thumbnail,
    };
  }

  override isMultiparts() {
    return true;
  }

  @on(ChangeImageUploaderFileEvent)
  onChangeImageUploaderFile(e: ChangeImageUploaderFileEvent) {
    this._thumbnailView?.setThumbnail(e.detail);
  }

  @on(FormValidationErrorEvent)
  onFormValidationError(e: FormValidationErrorEvent) {
    this._messageView.setMessage(e.detail);
  }
}

export { AdminProductForm };

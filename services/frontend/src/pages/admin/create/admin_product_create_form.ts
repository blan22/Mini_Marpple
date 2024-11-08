import { html, on } from 'rune-ts';
import { CreateProductSchema } from '@monorepo/shared';
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
} from '../../../components';
import klass from './page.module.scss';

interface AdminProductCreateFormData {}

class AdminProductCreateForm extends Form {
  private _formController: FormController;
  private _imageUploaderView: ImageUploader;
  private _thumbnailView: Thumbnail;
  private _messageView: Message;

  constructor(data: AdminProductCreateFormData) {
    super({ ...data });

    this._formController = new FormController(this, CreateProductSchema);
    this._imageUploaderView = new ImageUploader({}, { name: 'thumbnail' });
    this._thumbnailView = new Thumbnail({ thumbnail: null });
    this._messageView = new Message({ text: '' });
  }

  override template() {
    return html`<form novalidate class="${klass.container}">
      <div class="${klass.left}">${this._thumbnailView}</div>
      <div class="${klass.right}">
        <input class="${klass.name}" name="name" type="text" placeholder="상품명을 입력해주세요." />
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
          },
        )}
        <div class="${klass.stock}">
          ${new Typography({ text: '가격' })}
          ${new Range({}, { name: 'price', require: true, min: 100, max: 10000000 })}
        </div>
        <div class="${klass.stock}">
          ${new Typography({ text: '수량' })} ${new Range({}, { name: 'stock', require: true, min: 0, max: 1000 })}
        </div>
        <div class="${klass.message}">${this._messageView}</div>
        ${new Button({ text: '등록' }, { variant: 'primary', type: 'submit' })}
      </div>
    </form>`;
  }

  override get multiparts() {
    return {
      thumbnail: this._thumbnailView?.data.thumbnail ?? null,
    };
  }

  override isMultiparts() {
    return Boolean(this._thumbnailView);
  }

  override submit(data: FormData) {
    console.log(data);
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

export { AdminProductCreateForm };

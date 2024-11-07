import { html, on, Page } from 'rune-ts';
import klass from './page.module.scss';
import {
  Button,
  Select,
  Layout,
  Header,
  ImageUploader,
  Typography,
  Range,
  Thumbnail,
  ChangeImageUploaderFileEvent,
} from '../../../components';

interface AdminProductCreatePageData {
  name: string | null;
  thumbnail: File | null;
  category: string | null;
  price: number | null;
  stock: number | null;
}

export class AdminProductCreatePage extends Page<AdminProductCreatePageData> {
  thumbnailView: Thumbnail | null = null;

  constructor(data: AdminProductCreatePageData) {
    super({ ...data });

    this.thumbnailView = new Thumbnail({ thumbnail: this.data.thumbnail });
  }

  override template() {
    return html`
      <div>
        ${new Layout(
          {
            content: html`
              <div class="${klass.container}">
                <div class="${klass.left}">${this.thumbnailView}</div>
                <div class="${klass.right}">
                  <input class="${klass.name}" name="name" type="text" placeholder="상품명을 입력해주세요." />
                  ${new ImageUploader({})}
                  ${new Select({
                    options: [
                      { name: '옷', value: 'cloth' },
                      { name: '공', value: 'ball' },
                    ],
                  })}
                  <div class="${klass.stock}">${new Typography({ text: '수량' })} ${new Range({})}</div>
                  ${new Button({ text: '버튼' }, { variant: 'primary', disabled: true })}
                </div>
              </div>
            `,
          },
          {
            header: new Header({}),
          },
        )}
      </div>
    `;
  }

  @on(ChangeImageUploaderFileEvent)
  onChangeImageUploaderFile(e: ChangeImageUploaderFileEvent) {
    this.thumbnailView?.setThumbnail(e.detail);
  }
}

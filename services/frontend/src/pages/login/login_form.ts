import { html, on } from 'rune-ts';
import { LoginSchema } from '@monorepo/shared';
import { Button, Form, FormController, FormValidationErrorEvent, Input, Message } from '../../components';
import klass from './page.module.scss';
import { login } from '../../lib/api';
import { redirect } from '../../lib/utils';
import type { HttpError } from '../../lib/httpError';

class LoginForm extends Form {
  private _formController: FormController;
  private _messageView: Message;

  constructor(data: {}) {
    super({ ...data });

    this._formController = new FormController(this, LoginSchema);
    this._messageView = new Message({ text: '' });
  }

  override template() {
    return html`
      <form class="${klass.login_form}">
        ${new Input({}, { name: 'email', type: 'email', placeholder: '이메일 주소를 입력해 주세요.', required: true })}
        ${new Input(
          {},
          {
            name: 'password',
            type: 'password',
            placeholder: '비밀번호를 입력해 주세요.',
            min: 8,
            max: 20,
            required: true,
          },
        )}
        ${new Button({ text: '로그인하기' }, { type: 'submit', variant: 'primary' })} ${this._messageView}
      </form>
    `;
  }

  @on(FormValidationErrorEvent)
  onFormValidationError(e: FormValidationErrorEvent) {
    this._messageView.setMessage(e.detail);
  }

  override submit(data) {
    login(data)
      .then(() => {
        redirect('/');
      })
      .catch((error: HttpError) => {
        this._messageView.setMessage('');
      });
  }
}

export { LoginForm };

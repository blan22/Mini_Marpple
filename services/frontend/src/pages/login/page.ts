import { html, Page } from 'rune-ts';
import klass from './page.module.scss';
import { Header, Layout, Typography } from '../../components';
import { LoginForm } from './login_form';

export class LoginPage extends Page<{}> {
  override template() {
    return html`<div>
      ${new Layout(
        {
          content: html`
            <div class="${klass.container}">
              ${new Typography({ text: 'Onboarding' }, { size: 'SIZE_36', weight: 'MEDIUM', as: 'h1' })}
              ${new LoginForm({})}
            </div>
          `,
        },
        {
          header: new Header({}),
        },
      )}
    </div>`;
  }
}

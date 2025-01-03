import { html, View } from 'rune-ts';
import klass from './header.module.scss';

interface HeaderData {
  params?: string;
}

class Header extends View<HeaderData> {
  constructor(data: HeaderData = {}) {
    super({ ...data });
  }

  override template() {
    return html`
      <div class="${klass.header}">
        <div class="${klass.header_left}">
          <a href="/"><h2>Onboarding</h2></a>
          <nav>
            <ul>
              <li>
                <a href="/product" class="${this.data.params?.includes('product') ? klass.header_active : ''}">상품</a>
              </li>
              <li>
                <a href="/admin" class="${this.data.params?.includes('admin') ? klass.header_active : ''}">어드민</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="${klass.header_right}">
          <ul>
            <li>
              <a href="/@/cart">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21.8002 6.2701C21.6302 6.0701 21.3902 5.9501 21.1302 5.9501H7.14023L6.18023 2.3501H2.87023C2.39023 2.3501 1.99023 2.7401 1.99023 3.2301C1.99023 3.7201 2.38023 4.1101 2.87023 4.1101H4.83023L7.98023 15.9401C8.01023 16.0401 8.05023 16.1301 8.10023 16.2001C8.13024 16.2401 8.16023 16.2701 8.19023 16.3001C8.22023 16.3401 8.25023 16.3801 8.29023 16.4101C8.33023 16.4401 8.38023 16.4601 8.43023 16.4901C8.47023 16.5101 8.50023 16.5301 8.53023 16.5501C8.62023 16.5801 8.71024 16.6001 8.81024 16.6001H19.4202C19.8402 16.6001 20.2002 16.3001 20.2802 15.8901L21.9702 7.0001C22.0202 6.7401 21.9502 6.4801 21.7802 6.2801L21.8002 6.2701Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M10.4202 21.6001C11.2984 21.6001 12.0102 20.8882 12.0102 20.0101C12.0102 19.132 11.2984 18.4201 10.4202 18.4201C9.5421 18.4201 8.83023 19.132 8.83023 20.0101C8.83023 20.8882 9.5421 21.6001 10.4202 21.6001Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M18.0402 21.6001C18.9184 21.6001 19.6302 20.8882 19.6302 20.0101C19.6302 19.132 18.9184 18.4201 18.0402 18.4201C17.1621 18.4201 16.4502 19.132 16.4502 20.0101C16.4502 20.8882 17.1621 21.6001 18.0402 21.6001Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="/@/order">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 10.5C14.346 10.5 16.2478 8.59721 16.2478 6.25C16.2478 3.90279 14.346 2 12 2C9.65406 2 7.75227 3.90279 7.75227 6.25C7.75227 8.59721 9.65406 10.5 12 10.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M12 12C6.82275 12 2.55498 15.9 2.00526 20.9C1.9453 21.49 2.40506 22 3.00474 22H20.9954C21.585 22 22.0548 21.49 21.9948 20.9C21.4451 15.89 17.1873 12 12.01 12H12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  get isActive() {
    return this.data.params;
  }
}

export { Header };

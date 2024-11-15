interface ToastOptions {
  variant?: keyof (typeof Toast)['constants'];
  fadeDuration?: number;
  fadeInterval?: number;
  duration?: number;
  closeButton?: boolean;
  immediately?: boolean;
}

interface Elements {
  container: HTMLElement;
  toastBox: HTMLElement;
  text: HTMLElement;
  closeButton: HTMLElement;
}

class Toast {
  private static constants = {
    default: {
      className: 'default',
      fadeDuration: 0,
      fadeInterval: 16,
      duration: 2000,
      closeButton: false,
      immediately: false,
    },
    success: {
      className: 'success',
    },
    accent: {
      className: 'accent',
    },
    error: {
      className: 'error',
      duration: 3000,
      closeButton: true,
    },
  };

  private queue: TaskQueue;
  private cancellationTokens: CancellationToken[];
  private element: Elements | null;

  constructor() {
    this.queue = new TaskQueue();
    this.cancellationTokens = [];
    this.element = null;
  }

  private initElement(selector?: string): void {
    const container = document.createElement('div');
    const toastBox = document.createElement('div');
    const text = document.createElement('div');
    const closeButton = document.createElement('span');

    container.id = 'vanilla-toast-container';
    toastBox.id = 'vanilla-toast';
    text.id = 'vanilla-toast-text';
    closeButton.id = 'vanilla-toast-close-button';
    closeButton.innerHTML = '&#10006;';

    toastBox.appendChild(text);
    toastBox.appendChild(closeButton);
    container.appendChild(toastBox);

    if (selector) {
      document.getElementById(selector)?.appendChild(container);
    } else {
      document.body.appendChild(container);
    }

    this.element = {
      container,
      toastBox,
      text,
      closeButton,
    };

    this.setStyle(Toast.constants.default);
  }

  public cancel(): void {
    if (this.cancellationTokens.length) this.cancellationTokens[0]?.cancel();
  }

  public cancelAll(): void {
    for (let i = this.cancellationTokens.length - 1; i >= 0; i--) {
      this.cancellationTokens[i]?.cancel();
    }
  }

  public show(text: string, option: ToastOptions = {}, callback?: () => void): Toast {
    if (!this.element) this.initElement();
    if (option.immediately) this.cancelAll();

    const cancellationToken = new CancellationToken();
    this.queue.enqueue((next) => {
      const {
        fadeDuration = Toast.constants.default.fadeDuration,
        fadeInterval = Toast.constants.default.fadeInterval,
        duration = Toast.constants.default.duration,
        closeButton = Toast.constants.default.closeButton,
      } = option;

      if (this.element) {
        this.element.closeButton.style.display = closeButton ? 'inline' : 'none';
        this.element.text.innerHTML = text;

        const style = this.element.toastBox.style;
        style.opacity = '0';
        style.display = 'inline-block';

        this.setStyle(option);

        let timeoutId: number | null = null;
        const timeoutCallback = () => {
          timeoutId = null;
          this.element?.toastBox.removeEventListener('click', cancelHandler);
          this.hide(option, cancellationToken, () => {
            if (callback) callback();
            this.cancellationTokens.shift()?.dispose();
            next();
          });
        };

        const cancelHandler = () => {
          if (!timeoutId) return;
          clearTimeout(timeoutId);
          timeoutCallback();
        };

        this.fade(style, Math.min(fadeInterval / fadeDuration, 1), fadeInterval, cancellationToken, () => {
          this.element?.toastBox.addEventListener('click', cancelHandler);
          if (cancellationToken.isCancellationRequested) {
            timeoutCallback();
          } else {
            timeoutId = window.setTimeout(timeoutCallback, duration);
            cancellationToken.register(cancelHandler);
          }
        });
      }
    });

    this.cancellationTokens.push(cancellationToken);
    return this;
  }

  private setStyle(option: ToastOptions): void {
    if (this.element) {
      this.element.toastBox.className = option.variant || Toast.constants.default.className;
    }
  }

  private hide(option: ToastOptions, cancellationToken: CancellationToken, callback: () => void): void {
    const fadeDuration = option.fadeDuration || Toast.constants.default.fadeDuration;
    const fadeInterval = option.fadeInterval || Toast.constants.default.fadeInterval;
    const fadeStep = Math.min(fadeInterval / fadeDuration, 1);

    if (this.element) {
      const s = this.element.toastBox.style;
      s.opacity = '1';

      this.fade(s, -fadeStep, fadeInterval, cancellationToken, () => {
        s.display = 'none';
        if (callback) callback();
      });
    }
  }

  private fade(
    style: CSSStyleDeclaration,
    step: number,
    interval: number,
    cancellationToken: CancellationToken,
    callback: () => void,
  ): void {
    const fade = () => {
      if (cancellationToken.isCancellationRequested) {
        style.opacity = step < 0 ? '0' : '1';
        if (callback) callback();
        return;
      }
      style.opacity = `${Number(style.opacity) + step}`;
      if ((step < 0 && Number(style.opacity) < 0) || (step > 0 && Number(style.opacity) >= 1)) {
        if (callback) callback();
      } else {
        let timeoutId = window.setTimeout(() => {
          timeoutId = null as any;
          fade();
        }, interval);
        cancellationToken.register(() => {
          if (!timeoutId) return;
          clearTimeout(timeoutId);
          timeoutId = null as any;
          if (callback) callback();
        });
      }
    };
    fade();
  }
}

class CancellationToken {
  public isCancellationRequested: boolean;
  private cancelCallbacks: (() => void)[];

  constructor() {
    this.isCancellationRequested = false;
    this.cancelCallbacks = [];
  }

  public cancel(): void {
    this.isCancellationRequested = true;
    [...this.cancelCallbacks].forEach((callback) => callback());
  }

  public register(callback: () => void): void {
    this.cancelCallbacks.push(callback);
  }

  public dispose(): void {
    this.cancelCallbacks = [];
  }
}

class TaskQueue {
  private queue: ((next: () => void) => void)[];
  private isExecuting: boolean;

  constructor() {
    this.queue = [];
    this.isExecuting = false;
  }

  public enqueue(job: (next: () => void) => void): void {
    this.queue.push(job);
    this.dequeueAndExecute();
  }

  private dequeueAndExecute(): void {
    if (this.isExecuting) return;

    const job = this.queue.shift();
    if (!job) return;

    this.isExecuting = true;
    job(() => {
      this.isExecuting = false;
      this.dequeueAndExecute();
    });
  }
}

const toast = new Toast();

export { toast };

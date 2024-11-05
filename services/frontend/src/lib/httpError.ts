interface ErrorCodeType {
  [key: number]: string;
}

export const ErrorCode: ErrorCodeType = {
  400: '에러 발생',
};

export class HttpError<T extends number = number> extends Error {
  public override readonly cause?: Error;
  public override readonly message: string;
  public readonly statusCode: T;
  public readonly url: string | undefined;
  public readonly method: string | undefined;

  constructor(opts: { url?: string; method?: string; message?: string; statusCode: T; cause?: Error }) {
    super(opts.message ?? `HTTP Error ${opts.statusCode} `);

    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = HttpError.prototype.constructor.name;

    this.cause = opts.cause;
    this.statusCode = opts.statusCode;
    this.url = opts.url;
    this.method = opts.method;
    this.message = opts.message ?? `HTTP Error ${opts.statusCode}`;

    if (opts.cause instanceof Error && opts.cause.stack) {
      this.stack = opts.cause.stack;
    }
  }

  public static fromRequest(request: Request, response: Response) {
    return new HttpError({
      message: response.statusText || ErrorCode[response.status],
      url: response.url,
      method: request.method,
      statusCode: response.status,
    });
  }
}

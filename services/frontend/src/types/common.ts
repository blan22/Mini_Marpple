interface ServerResponse<T> {
  message: string;
  data: T;
}

export type { ServerResponse };

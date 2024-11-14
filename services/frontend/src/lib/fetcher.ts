import { HttpError } from './httpError';

export interface FetcherRequestInit extends RequestInit {
  params?: number | string;
  query?: {
    [key: string]: any;
  };
}

export async function http<T extends any>(path: string, config: FetcherRequestInit): Promise<T> {
  const { params, query, ...rest } = config;

  if (params) path += `/${params}`;
  if (query) path += `?${new URLSearchParams(query)}`;

  const request = new Request(path, rest);
  const response: Response = await fetch(request);

  if (!response.ok) {
    const errorJson = await response.json();
    const error = HttpError.fromRequest(request, response, errorJson.message || response.statusText);
    throw error;
  }

  return await response.json();
}

export async function get<T extends unknown = any>(path: string, config?: FetcherRequestInit): Promise<T> {
  const init = { method: 'GET', ...config };
  return await http<T>(path, init);
}

export async function post<T extends unknown = any, U extends unknown = any>(
  path: string,
  body: T,
  config?: FetcherRequestInit,
): Promise<U> {
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...config,
  };
  return await http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config?: FetcherRequestInit): Promise<U> {
  const init = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...config,
  };
  return await http<U>(path, init);
}

export async function patch<T extends unknown = any, U extends unknown = any>(
  path: string,
  body: T,
  config?: FetcherRequestInit,
): Promise<U> {
  const init = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...config,
  };
  return await http<U>(path, init);
}

export async function remove<T extends unknown = any, U extends unknown = any>(
  path: string,
  body?: T,
  config?: FetcherRequestInit,
): Promise<U> {
  const init = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    ...config,
  };
  return await http<U>(path, init);
}

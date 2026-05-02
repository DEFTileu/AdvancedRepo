import type { ApiError } from '@/types/domain';

const API_ORIGIN = import.meta.env.VITE_API_URL ?? '';
const BASE = API_ORIGIN + '/api';

export const resolveUrl = (path: string) => API_ORIGIN + path;

export class ApiException extends Error {
  constructor(public status: number, public payload: ApiError) {
    super(payload.message || payload.error);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const res = await fetch(`${BASE}${path}`, { credentials: 'include', ...init, headers });
  if (res.status === 204) return undefined as T;
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    const payload: ApiError = contentType.includes('application/json')
      ? await res.json()
      : { error: 'NETWORK_ERROR', message: res.statusText };
    throw new ApiException(res.status, payload);
  }
  return contentType.includes('application/json') ? (res.json() as Promise<T>) : (undefined as T);
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: any) =>
    request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),
  put: <T>(path: string, body?: any) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

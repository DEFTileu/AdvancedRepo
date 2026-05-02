import { api } from './client';
import type { User } from '@/types/domain';

export const authApi = {
  me: () => api.get<User>('/auth/me'),
  login: (username: string, password: string) =>
    api.post<void>('/auth/login', { username, password }),
  logout: () => api.post<void>('/auth/logout'),
  register: (username: string, password: string, displayName: string) =>
    api.post<User>('/auth/register', { username, password, displayName }),
};

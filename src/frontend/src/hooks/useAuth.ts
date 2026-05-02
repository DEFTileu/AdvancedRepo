import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth';
import { ApiException } from '@/api/client';
import type { User } from '@/types/domain';

const ME_KEY = ['auth', 'me'];

export function useAuth() {
  const qc = useQueryClient();

  const me = useQuery<User | null>({
    queryKey: ME_KEY,
    queryFn: async () => {
      try {
        return await authApi.me();
      } catch (e) {
        if (e instanceof ApiException && e.status === 401) return null;
        throw e;
      }
    },
    staleTime: 60_000,
  });

  const login = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: () => qc.invalidateQueries({ queryKey: ME_KEY }),
  });

  const logout = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => qc.setQueryData(ME_KEY, null),
  });

  const register = useMutation({
    mutationFn: ({
      username,
      password,
      displayName,
    }: {
      username: string;
      password: string;
      displayName: string;
    }) => authApi.register(username, password, displayName),
  });

  return {
    user: me.data ?? null,
    isLoading: me.isLoading,
    isAuthenticated: !!me.data,
    isAdmin: me.data?.role === 'ADMIN',
    login,
    logout,
    register,
  };
}

import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
  password2: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    email: string;
    username: string;
    is_admin: boolean;
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/users/token/', credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/users/register/', credentials);
  return response.data;
};

export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const response = await api.post<{ access: string }>('/api/users/token/refresh/', { refresh });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/api/users/profile/');
  return response.data;
};

export const updateUserProfile = async (data: { bio?: string; preferences?: Record<string, unknown>; healthHistory?: string[] }) => {
  const response = await api.put('/api/users/profile/update/', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

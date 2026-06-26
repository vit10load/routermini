import { jwtDecode } from 'jwt-decode';
import type { AuthUser } from '../types/auth';

const TOKEN_KEY = 'routermini_access_token';

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function getAuthenticatedUser(): AuthUser | null {
  const token = getToken();

  if (!token) return null;

  return jwtDecode<AuthUser>(token);
}
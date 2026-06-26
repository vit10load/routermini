import { apolloClient } from '../apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/login';
import { REGISTER_USER_MUTATION } from '../graphql/mutations/registerUser';
import {
  getAuthenticatedUser,
  removeToken,
  saveToken,
} from '../auth/auth.service';
import type { AuthUser, LoginResponse } from '../types/auth';

export async function login(input: {
  email: string;
  password: string;
}): Promise<AuthUser | null> {
  const { data } = await apolloClient.mutate<LoginResponse>({
    mutation: LOGIN_MUTATION,
    variables: { input },
  });

  const token = data?.login.accessToken;

  if (!token) {
    throw new Error('Token não retornado.');
  }

  saveToken(token);

  return getAuthenticatedUser();
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
}) {
  const { data } = await apolloClient.mutate({
    mutation: REGISTER_USER_MUTATION,
    variables: { input },
  });

  return data;
}

export function logout() {
  removeToken();
}

export function currentUser() {
  return getAuthenticatedUser();
}
export interface LoginResponse {
  login: {
    accessToken: string;
  };
}

export interface AuthUser {
  userId: string;
  email: string;
  name: string;
}
export interface AuthBody {
  email: string;
  password: string;
}

export interface RefreshResponse {
  success: boolean;
}

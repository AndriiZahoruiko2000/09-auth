export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface UpdateUserBody {
  email?: string;
  username: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface LoggedUser {
  id: string;
  email: string;
  espireDate: number;
}
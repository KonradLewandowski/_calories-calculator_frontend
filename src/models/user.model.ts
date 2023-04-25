export interface IUserModel {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  error: string;
  status: number;
}

export interface ILoginUserCredentials {
  login: string;
  password: string;
}
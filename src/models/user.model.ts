export interface UserModel {
  _id: string;
  username: string;

  email: string;
  password: string;
  avatar: string;
}

export interface ILoginUserCredentials {
  login: string;
  password: string;
}

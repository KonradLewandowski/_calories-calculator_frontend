export interface ILoginUserCredentials {
  login?: string;
  password?: string;
}

export interface ISignupUserCredentials {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IToken {
  token?: string | null;
}

export interface IEmailCredentials {
  email?: string;
}

export interface INewPassword {
  password?: string;
  confirmPassword?: string;
}

export interface IUpdateUserData {
  username?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface IUploadUserImage {
  image?: FileList;
}

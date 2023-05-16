import {
  IToken,
  IEmailCredentials,
  ILoginUserCredentials,
  ISignupUserCredentials,
  INewPassword,
  IUpdateUserData,
  IUploadUserImage,
} from "../interfaces/user.interface";
import { IBody } from "../interfaces/body.interface";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  return await fetch(input, init);
};

export const fetchUsers = async (): Promise<IBody[]> => {
  const fetchedData = await fetchData(`${serverUrl}/all`, { method: "GET" });
  return fetchedData.json();
};

export const fetchLoggedUser = async (): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/auth`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  return fetchedData.json();
};

export const fetchLogOut = async (): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return fetchedData.json();
};

export const fetchLoginUser = async (
  bodyData: ILoginUserCredentials
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bodyData),
  });

  return fetchedData.json();
};

export const fetchSignupUser = async (
  bodyData: ISignupUserCredentials
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bodyData),
  });

  return fetchedData.json();
};

export const fetchConfirmEmail = async (
  token: IToken["token"]
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/confirm-email/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return fetchedData.json();
};

export const fetchResetToken = async (
  bodyData: IEmailCredentials
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/reset-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bodyData),
  });

  return fetchedData.json();
};

export const fetchResetPassword = async (
  bodyData: IEmailCredentials
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bodyData),
  });

  return fetchedData.json();
};

export const fetchNewPassword = async (
  token: IToken["token"],
  bodyData: INewPassword
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/new-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bodyData),
  });

  return fetchedData.json();
};

export const fetchUpdateUserData = async (
  bodyData: IUpdateUserData
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/update-user-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bodyData),
  });

  return fetchedData.json();
};

export const fetchUploadUserImage = async (
  formData: FormData
): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/update-user-image`, {
    method: "POST",
    headers: {
      multipart: "form-data",
    },
    credentials: "include",
    body: formData,
  });

  return fetchedData.json();
};

export const fetchRemoveUserImage = async (): Promise<IBody> => {
  const fetchedData = await fetchData(`${serverUrl}/delete-user-image`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return fetchedData.json();
};

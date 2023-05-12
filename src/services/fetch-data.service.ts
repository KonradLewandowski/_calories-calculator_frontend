import { IUserModel } from "../models/user.model";
import {
  IEmailCredentials,
  ILoginUserCredentials,
  ISignupUserCredentials,
} from "../interfaces/user.interface";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  // console.log("fetchData response: ", await fetch(input, init));
  return await fetch(input, init);
};

export const fetchUsers = async (): Promise<IUserModel[]> => {
  const fetchedData = await fetchData(`${serverUrl}/all`, { method: "GET" });
  return fetchedData.json();
};

export const fetchLoggedUser = async (): Promise<IUserModel | null> => {
  const fetchedData = await fetchData(`${serverUrl}/auth`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  console.log("fetchLoggedUser response: ", fetchedData);
  return fetchedData.json();
};

export const fetchLogOut = async (): Promise<{}> => {
  return await fetchData(`${serverUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const fetchLoginUser = async (
  bodyData: ILoginUserCredentials
): Promise<IUserModel> => {
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
): Promise<IUserModel> => {
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
  token: string | null
): Promise<IUserModel> => {
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
): Promise<IUserModel> => {
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
): Promise<IUserModel> => {
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

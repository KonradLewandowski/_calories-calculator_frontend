import { IUserModel } from "../models/user.model";
import {
  ILoginUserCredentials,
  ISignupUserCredentials,
} from "../interfaces/user.interface";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  // console.log("fetchData response: ", await fetch(input, init));
  return await fetch(input, init);
};

export const fetchUsers = async (): Promise<IUserModel[]> => {
  const users = await fetchData(`${serverUrl}/all`, { method: "GET" });
  return users.json();
};

export const fetchLoggedUser = async (): Promise<IUserModel | null> => {
  const user = await fetchData(`${serverUrl}/auth`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  // console.log("fetchLoggedUser response: ", user);
  return user.json();
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
  userCredentials: ILoginUserCredentials
): Promise<IUserModel> => {
  const loginUser = await fetchData(`${serverUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userCredentials),
  });

  return loginUser.json();
};

export const fetchSignupUser = async (
  userCredentials: ISignupUserCredentials
): Promise<IUserModel> => {
  const signupUser = await fetchData(`${serverUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userCredentials),
  });

  return signupUser.json();
};

export const fetchConfirmEmail = async (
  token: string | null
): Promise<IUserModel> => {
  const confirmedUser = await fetchData(`${serverUrl}/confirm-email/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return confirmedUser.json();
};

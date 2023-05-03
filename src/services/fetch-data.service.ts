import { IUserModel } from "../models/user.model";
import {
  ILoginUserCredentials,
  ISignupUserCredentials,
  IConfirmEmailToken,
} from "../interfaces/user.interface";

// const fetchUrlProd = "https://calories-calculator-api.herokuapp.com/api/users";
const fetchUrlDev = "http://localhost:3030/api/users";
const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  return await fetch(input, init);
};

export const fetchUsers = async (): Promise<IUserModel[]> => {
  const users = await fetchData(`${fetchUrlDev}/all`, { method: "GET" });
  return users.json();
};

export const fetchLoggedUser = async (): Promise<IUserModel | null> => {
  const user = await fetchData(`${fetchUrlDev}/auth`, {
    method: "GET",
    credentials: "include",
  });

  return user.json();
};

export const fetchLogOut = async (): Promise<{}> => {
  return await fetchData(`${fetchUrlDev}/logout`, {
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
  const loginUser = await fetchData(`${fetchUrlDev}/login`, {
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
  const signupUser = await fetchData(`${fetchUrlDev}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userCredentials),
  });

  return signupUser.json();
};

export const fetchConfirmEmail = async (token: IConfirmEmailToken) => {
  await fetchData(`${fetchUrlDev}/confirm-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

import { ILoginUserCredentials, UserModel } from "../models/user.model";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  return await fetch(input, init);
};

export const fetchUsers = async (): Promise<UserModel[]> => {
  const users = await fetchData("/api/users/all", { method: "GET" });
  return users.json();
};

export const fetchLoginUser = async (
  userCredentials: ILoginUserCredentials
): Promise<UserModel> => {
  const loginUser = await fetchData(
    "https://calories-calculator-api.herokuapp.com/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    }
  );

  return loginUser.json();
};

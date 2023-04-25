import { ILoginUserCredentials, IUserModel } from "../models/user.model";

const fetchUrl = "https://calories-calculator-api.herokuapp.com/api/users";
const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  return await fetch(input, init);
};

export const fetchUsers = async (): Promise<IUserModel[]> => {
  const users = await fetchData(`${fetchUrl}/all`, { method: "GET" });
  return users.json();
};

export const fetchLoginUser = async (
  userCredentials: ILoginUserCredentials
): Promise<IUserModel> => {
  const loginUser = await fetchData(`${fetchUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  return loginUser.json();
};

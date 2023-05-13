import { IUserModel } from "../models/user.model";

export interface IBody extends IUserModel {
  errorMessage: string;
  status: "success" | "failure";
}

import { IUserModel } from "../models/user.model";
import { IInfoState } from "./info-state.interface";

export interface IBody {
  body: IUserModel;
  errorMessage: IInfoState["errorMessage"];
  status: IInfoState["status"];
}

export interface IBodyAllUsers {
  body: IUserModel[];
  errorMessage: IInfoState["errorMessage"];
  status: IInfoState["status"];
}

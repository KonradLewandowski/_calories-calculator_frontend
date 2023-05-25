import { IUserModel } from "../models/user.model";
import { IInfoState } from "./info-state.interface";

export interface IBody {
  body: IUserModel;
  infoMessage: IInfoState["infoMessage"];
  status: IInfoState["status"];
}

export interface IBodyAllUsers {
  body: IUserModel[];
  infoMessage: IInfoState["infoMessage"];
  status: IInfoState["status"];
}

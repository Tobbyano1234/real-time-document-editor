import { ObjectId } from "mongodb";
import { User } from "../../../max-entities";

export type GetUserDTO = {
  email?: string;
  googleSocialID?: string;
  userID?: string | ObjectId;
};

export type GetUserOptions = {
  shouldPopulate?: boolean;
  onUserNotFound?: ({
    email,
    userID,
    googleSocialID,
  }: GetUserDTO) => void | never;
};

export type CheckUserDTO = {
  username: string;
  userID: string;
  computedProps?: {
    _user?: User;
  };
};

export type CheckEmailDTO = {
  email: string;
  userID: string;
};

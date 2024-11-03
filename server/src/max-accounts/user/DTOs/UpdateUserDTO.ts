import { ObjectId } from "mongodb";

export type UpdateUserProfileDTO = {
  userID: string;
  avatar?: string;
  firstname?: string;
  lastname?: string;
  organisationName: string;
  organisationCategoryID: ObjectId;
};


export type UpdateUserUsernameDTO = {
  userID: string;
  username: string;
};

export type UpdateUserEmailDTO = {
  userID: string;
  email: string;
  password: string;
  otp: string;
};

import { ObjectId } from "mongodb";
import { User } from "../../max-entities";

export type VerifyUserPasswordDTO = {
  oldPassword: string;
  email: string;
  computedProps?: {
    _user?: User;
  };
};


export type ResetPasswordDTO = {
  otp?: string;
  email: string;
  newPassword: string;
  confirmPassword?: string;
};

export type ChangeUserPasswordDTO = {
  userID: ObjectId;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  otp: string;
  computedProps?: {
    _user?: User;
  };
};

export type VerifyUserEmailDTO = {
  userID: ObjectId;
  email: string;
};

export type VerifyCompanyEmailDTO = {
  companyID: ObjectId;
  email: string;
};

export type VerifyCompanyEmployeeEmailDTO = {
  companyEmployeeID: ObjectId;
  email: string;
};

export type VerifyAdminEmailDTO = {
  adminID: ObjectId;
  email: string;
};

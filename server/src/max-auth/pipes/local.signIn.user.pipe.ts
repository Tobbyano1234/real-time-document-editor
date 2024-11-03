import bcrypt from "bcrypt";

import { issueToken } from "../plugins";
import { LocalSignInDTO } from "../DTOs/signIn.DTO";
import { AccountStatus, AccountType } from "../../typings/Account.types";
import {  UserModel } from "../../max-entities";

export const LocalSignInIndividualPipe = async (DTO: LocalSignInDTO) => {
  const { email, password } = DTO;
  const user = await UserModel.findOne({ email });
  if (!user)
    return {
      success: false,
      message: `email or password incorrect`,
      data: null,
      hookData: null,
    };

  const { _id, status, password: hashedPassword } = user;
 

  if (status == AccountStatus.SUSPENDED)
    return {
      success: false,
      message: "User currently suspended",
      data: null,
      hookData: null,
    };
  const passwordVerified = await bcrypt.compare(
    password,
    String(hashedPassword)
  );
  if (!passwordVerified)
    return {
      success: false,
      message: `email or password incorrect`,
      data: null,
      hookData: null,
    };

  const token = await issueToken({
    accountType: AccountType.USER,
    _id,
    issuedAt: Date.now(),
    email,
  });

  const meta = {
    document: 0,
  };
  (user as any).meta = meta;

  return {
    success: true,
    message: "User signed in successfully",
    data: user,
    hookData: user,
    token,
  };
};

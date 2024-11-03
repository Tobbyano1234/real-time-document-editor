import bcrypt from "bcrypt";

import { issueToken } from "../plugins";
import { LocalSignInDTO } from "../DTOs/signIn.DTO";
import { UserMetaDataGeneral } from "../../typings/User.types";
import { AccountStatus, AccountType } from "../../typings/Account.types";
import { ModelNames, GeneralModel, UserModel } from "../../max-entities";

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
  const UserMetaData = (await GeneralModel.findOne({
    collectionID: _id,
    collectionName: ModelNames.USER,
    "associatedData.type": "metaData",
  })) as UserMetaDataGeneral;
  // if (!UserMetaData)
  //   return {
  //     success: false,
  //     message: `cannot authorize user`,
  //     data: null,
  //     hookData: null,
  //   };
  // if (!UserMetaData || !UserMetaData.associatedData.metaData.verifiedAt) {
  //   return {
  //     success: false,
  //     message: "User not verified, kindly verify your account",
  //     data: user,
  //     hookData: user,
  //   };
  // }

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

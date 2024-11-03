import { Types } from "mongoose";

import { issueOtp } from "../plugins";
import { UserMetaDataGeneral } from "../../typings/User.types";
import { AccountSignType, AccountStatus } from "../../typings/Account.types";

import { GeneralModel, ModelNames, UserModel, User } from "../../max-entities";


export const LocalSignUpUserSuccessHook = (user: User) =>
  process.nextTick(async () => {
    const { email } = user;
    const otpData = await issueOtp(email);
    const { emailOtp: otp, timeLeft } = otpData;
    console.log(otp, timeLeft);
    await GeneralModel.create({
      collectionID: user._id,
      collectionName: ModelNames.USER,
      associatedData: {
        type: "metaData",
        metaData: {
          signType: AccountSignType.DIRECT,
          status: AccountStatus.ACTIVE,
          firstLoginDate: null, // depends on if we send an access token during sign up
          lastLoginDate: null,
          passwordChangedAt: [],
          verifiedAt: null,
        },
      },
    });
  });

export const LocalSignInUserSuccessHook = (user: User) =>
  process.nextTick(async () => {
    const { _id } = user;
    const UserMetaData = (await GeneralModel.findOne({
      collectionID: new Types.ObjectId(_id),
      collectionName: ModelNames.USER,
      "associatedData.type": "metaData",
    })) as UserMetaDataGeneral;

    if (UserMetaData) {
      const { associatedData } = UserMetaData;
      if (!associatedData.metaData.lastLoginDate) {
        await GeneralModel.findByIdAndUpdate(UserMetaData._id, {
          "associatedData.metaData.firstLoginDate": new Date(),
        });
        await UserModel.findByIdAndUpdate(_id, { isNewUser: false });
      }
      await GeneralModel.findByIdAndUpdate(UserMetaData._id, {
        "associatedData.metaData.lastLoginDate": new Date(),
      });
    }
  });

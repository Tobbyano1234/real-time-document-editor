import { Types } from "mongoose";
import { match } from "ts-pattern";

import { issueOtp } from "../plugins";
import { UserMetaDataGeneral } from "../../typings/User.types";
import { AccountSignType, AccountStatus } from "../../typings/Account.types";

import { GeneralModel, ModelNames, UserModel, User } from "../../max-entities";

enum UserType {
  USER = "user",
}
type AllUsers = User & {
  context?: string;
  googleSocialID?: string;
};

export const GoogleSignUpSuccessHook = (user: AllUsers) =>
  process.nextTick(async () => {
    const { context } = user;
    await match(context)
      .with(UserType.USER, async () => {
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

        GoogleSignInSuccessHook(user as User);
      })
      .run();
  });

export const GoogleSignInSuccessHook = (user: AllUsers) =>
  process.nextTick(async () => {
    const { _id, googleSocialID, context } = user;
    await match(context)
      .with(UserType.USER, async () => {
        await UserModel.findByIdAndUpdate(
          _id,
          { googleSocialID },
          { new: true }
        );

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
      })
      .run();
  });

export const LocalSignUpUserSuccessHook = (user: AllUsers) =>
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

export const LocalSignInUserSuccessHook = (user: AllUsers) =>
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

export const LocalSignInUserFailureHook = (user: AllUsers) =>
  process.nextTick(async () => {
    if (user === null) return;
    const { email } = user;
    // if (!isVerified && isVerified === false) {
    const otpData = await issueOtp(email);
    const { emailOtp: otp, timeLeft } = otpData;
    console.log(otp, timeLeft);

    // }
  });

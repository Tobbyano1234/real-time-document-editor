import { issueOtp } from "../plugins";

import { sendOtpMail } from "../../max-shared/mail";
import { GeneralModel, ModelNames, User } from "../../max-entities";

export const UserPasswordVerifyHook = (user: User) =>
  process.nextTick(async () => {
    const { email } = user;
    const otpData = await issueOtp(email);
    const { emailOtp: otp, timeLeft } = otpData;
    await sendOtpMail("reset", {
      account: user,
      otp,
      timeLeft: `${timeLeft} in minutes`,
    });
  });

export const UserPasswordChangedHook = (user: User) =>
  process.nextTick(async () => {
    const { _id } = user;
    await GeneralModel.findOneAndUpdate(
      {
        collectionID: _id,
        collectionName: ModelNames.USER,
        "associatedData.type": "metaData",
      },
      {
        $push: { "associatedData.metaData.passwordChangedAt": new Date() },
      },
      { new: true }
    );
  });

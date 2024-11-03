import { issueToken, verifyOtp } from "../plugins";
import { MailVerifyOtpDTO } from "../DTOs/verifyOtp.DTO";
import { AccountType } from "../../typings/Account.types";
import { GeneralModel, ModelNames, User, UserModel } from "../../max-entities";

export const MailVerifyUserOtpPipe = async ({
  email,
  otp,
  type,
}: MailVerifyOtpDTO) => {
  const user = await UserModel.findOne({ email });

  if (!user)
    return {
      success: false,
      message: `user with ${email} not found`,
      data: null,
      hookData: null,
    };

  const { _id } = user;
  const getOtp = await verifyOtp(email, otp);
  if (!getOtp)
    return {
      success: false,
      message: "Otp expired or incorrect",
      data: null,
      hookData: null,
    };

  if (type === "general") {
    return {
      success: true,
      message: "Otp verified successfully",
      data: null,
      hookData: null,
    };
  } else {
    const data = (await UserModel.findByIdAndUpdate(
      _id,
      { isVerified: true },
      { new: true }
    )) as User;
    await GeneralModel.findOneAndUpdate(
      {
        collectionID: _id,
        collectionName: ModelNames.USER,
        "associatedData.type": "metaData",
      },
      {
        "associatedData.metaData.verifiedAt": new Date(),
      },
      { new: true }
    );
    const token = await issueToken({
      accountType: AccountType.USER,
      _id,
      issuedAt: Date.now(),
      email,
    });
    const { password: _password, ...withoutPassword } =
      data?.toObject() as User;
    return {
      success: true,
      message: "success",
      data: withoutPassword,
      token,
      hookData: data,
    };
  }
};

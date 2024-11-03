import { issueOtp } from "../plugins";

import { MailSendOtpDTO } from "../DTOs/sendOtp.DTO";
import { sendOtpMail } from "../../max-shared/mail";
import { UserModel } from "../../max-entities";

export const MailSendUserOtpPipe = async ({ email, type }: MailSendOtpDTO) => {
  const user = await UserModel.findOne({ email });
  if (!user)
    return {
      success: false,
      message: `Individual account not found`,
      data: null,
      hookData: null,
    };
  const otpData = await issueOtp(user?.email);
  const { emailOtp: otp, timeLeft } = otpData;
  await sendOtpMail(type ? type : "general", {
    account: user,
    otp,
    timeLeft: `${timeLeft} minutes`,
  });
  return {
    success: true,
    message: `otp has been sent to your email`,
    data: { email },
    hookData: null,
  };
};

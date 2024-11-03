import { OTP } from "./sendOtp.DTO";

export type MailVerifyOtpDTO = {
  type: OTP;
  otp: string;
  email: string;
  newPassword?: string;
};

export type VerifyInviteCodeDTO = {
  inviteCode: string;
  token: string;
};

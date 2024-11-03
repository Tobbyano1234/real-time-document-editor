import bcrypt from "bcrypt";

import { verifyOtp } from "../plugins";

import { UserModel } from "../../max-entities";
import {
  ChangeUserPasswordDTO,
  VerifyUserPasswordDTO,
  VerifyUserEmailDTO,
  ResetPasswordDTO,
} from "../DTOs/passwordManager.DTO";
import { config } from "../../max-web-api/config";

export const VerifyUserPasswordPipe = async ({
  oldPassword,
  email,
  computedProps,
}: VerifyUserPasswordDTO) => {
  const _user = computedProps ? computedProps._user : null;
  const user = _user || (await UserModel.findOne({ email }));
  if (!user)
    return {
      success: false,
      message: `user not found`,
      data: null,
      hookData: null,
    };
  const passwordVerified = await bcrypt.compare(oldPassword, user.password);
  if (!passwordVerified)
    return {
      success: false,
      message: `passwords don't match`,
      data: null,
      hookData: null,
    };
  return {
    success: true,
    message: `valid credentials. OTP mail sent to ${email}`,
    data: user,
    hookData: user,
  };
};

export const VerifyUserEmailPipe = async ({
  userID,
  email,
}: VerifyUserEmailDTO) => {
  const user = await UserModel.findOne({ email });
  if (!user)
    return {
      success: false,
      message: `user not found`,
      data: null,
      hookData: null,
    };
  const emailMatch = user.email == email;
  if (!emailMatch)
    return {
      success: false,
      message: `emails don't match`,
      data: null,
      hookData: null,
    };
  return {
    success: true,
    message: `valid email: ${email}`,
    data: user,
    hookData: user,
  };
};

export const ChangeUserPasswordPipe = async ({
  userID,
  oldPassword,
  newPassword,
  confirmPassword,
  computedProps,
  otp,
}: ChangeUserPasswordDTO) => {
  const _user = computedProps ? computedProps._user : null;
  const user = _user || (await UserModel.findById(userID));
  if (!user)
    return {
      success: false,
      message: `user not found`,
      data: null,
      hookData: null,
    };
  const { _id, email } = user;
  const otpVerification = await verifyOtp(email, otp);
  if (!otpVerification)
    return {
      success: false,
      message: "Otp expired or incorrect",
      data: null,
      hookData: null,
    };
  await VerifyUserPasswordPipe({
    oldPassword,
    email,
    computedProps: { _user: user },
  });
  const passwordVerified = newPassword === confirmPassword;
  if (!passwordVerified)
    return {
      success: false,
      message: `passwords don't match`,
      data: null,
      hookData: null,
    };
  const hashedPassword = await bcrypt.hash(
    newPassword,
    +config.defaults.saltWorker
  );

  const data = await UserModel.findByIdAndUpdate(
    _id,
    { password: hashedPassword },
    { new: true }
  );
  return {
    success: true,
    message: "password reset successful",
    data,
    hookData: data,
  };
};

export const ResetUserPasswordPipe = async ({
  email,
  newPassword,
  confirmPassword,
  otp,
}: ResetPasswordDTO) => {
  // const otpVerification = await verifyOtp(email, otp);
  // if (!otpVerification) return { success: false, message: 'otp expired or incorrect', data: null, hookData: null};

  // const passwordVerified = newPassword === confirmPassword;
  // if (!passwordVerified) return {
  // 		success: false,
  // 		message: `passwords don't match`,
  // 		data: null,
  // 		hookData: null,
  // 	};
  const hashedPassword = await bcrypt.hash(
    newPassword,
    +config.defaults.saltWorker
  );

  const user = await UserModel.findOne({ email });
  if (!user)
    return {
      success: false,
      message: `user not found`,
      data: null,
      hookData: null,
    };
  const { _id } = user;
  const data = await UserModel.findByIdAndUpdate(
    _id,
    { password: hashedPassword },
    { new: true }
  );
  return {
    success: true,
    message: "password reset successful",
    data,
    hookData: data,
  };
};

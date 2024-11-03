import { Request } from "express";
import httpStatus from "http-status";

import { BaseController } from "../../../max-shared/api";
import { GoogleAuthCodeDTO, LocalSignInDTO } from "../../DTOs/signIn.DTO";
import { MailSendOtpDTO } from "../../DTOs/sendOtp.DTO";
// import { LoginStatusDTO } from '../../DTOs/LoginStatusDTO';
import { MailVerifyOtpDTO } from "../../DTOs/verifyOtp.DTO";
// import { UserSuspendAccountDTO } from '../../DTOs/suspendAccount.DTO';
// import { DeactivateAccountDTO } from '../../DTOs/deactivateAccount.DTO';
// import { DeactivateAccountModule } from '../../modules/deactivateAccount.module';
// import { UserDeactivateAccountHook } from '../../hooks/userDeactivateAccount.hook';
// import { LocalSignUpDTO, LocalSignUpOrganisationDTO, LocalSignUpCompanyDTO, LocalSignUpMerchantDTO, LocalSignUpCreateCompanyDTO } from '../../DTOs/signUp.DTO';
import {
  PasswordManagerModule,
  signInModule,
  sendOTPModule,
  signUpModule,
  verifyOTPModule,
} from "../../modules";
import {
  VerifyUserEmailDTO,
  VerifyUserPasswordDTO,
  ChangeUserPasswordDTO,
  ResetPasswordDTO,
} from "../../DTOs/passwordManager.DTO";
import {
  LocalSignUpUserSuccessHook,
  LocalSignInUserSuccessHook,
  LocalSignInUserFailureHook,
  UserPasswordChangedHook,
  UserPasswordVerifyHook,
} from "../../hooks";
import { LocalSignUpUserDTO } from "../../DTOs";
import { toObjectId } from "../../../max-shared/validateToObjectID";
import { AuthenticatedRequest } from "../../../typings/express";
import { GoogleAuthCodePipe } from "../../pipes/google.auth.code.pipe";

export class AuthController {
  static googleAuthCode = BaseController(async (request: Request) => {
    const GoogleAuthCodeDTO = request.body as GoogleAuthCodeDTO;
    const { message, data, success, token } = await GoogleAuthCodePipe(
      GoogleAuthCodeDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
      token,
    };
  });

  static signUpUser = BaseController(async (request: Request) => {
    const LocalSignUpDTO = request.body as LocalSignUpUserDTO;
    const { success, message, data } = (await signUpModule({
      DTO: ["local", "user", LocalSignUpDTO],
      onSuccess: LocalSignUpUserSuccessHook,
    }))!;
    return {
      status: success ? httpStatus.CREATED : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static signInUser = BaseController(async (request: Request) => {
    const LocalSignInDTO = request.body as LocalSignInDTO;
    const { success, message, data, token } = (await signInModule({
      DTO: ["local", "user", LocalSignInDTO],
      onSuccess: LocalSignInUserSuccessHook,
      onFailure: LocalSignInUserFailureHook,
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.PRECONDITION_REQUIRED,
      message,
      data,
      token,
    };
  });

  static sendUserOTP = BaseController(async (request: Request) => {
    const MailSendOtpDTO = request.body as MailSendOtpDTO;
    const { success, message, data } = (await sendOTPModule({
      DTO: ["user", MailSendOtpDTO],
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static verifyUserOTP = BaseController(async (request: Request) => {
    const MailVerifyOtpDTO = request.body as MailVerifyOtpDTO;
    const { success, message, data, token } = (await verifyOTPModule({
      DTO: ["user", MailVerifyOtpDTO],
      onSuccess: () => {},
      // onSuccess: OTPUserVerifedHook
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
      token,
    };
  });

  static verifyUserPassword = BaseController(async (request: Request) => {
    const VerifyPasswordDTO = request.body as VerifyUserPasswordDTO;
    const { success, message, data } = (await PasswordManagerModule({
      DTO: ["verify-user-password", VerifyPasswordDTO],
      onSuccess: UserPasswordVerifyHook,
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static verifyUserEmail = BaseController(async (request: Request) => {
    const VerifyEmailDTO = request.body as VerifyUserEmailDTO;
    const { success, message, data } = (await PasswordManagerModule({
      DTO: ["verify-user-email", VerifyEmailDTO],
      onSuccess: () => {},
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static changeUserPassword = BaseController(
    async (request: AuthenticatedRequest | Request) => {
      const ChangePasswordDTO = request.body as ChangeUserPasswordDTO;
      ChangePasswordDTO.userID = toObjectId(request.token._id);
      const { success, message, data } = (await PasswordManagerModule({
        DTO: ["change-user-password", ChangePasswordDTO],
        onSuccess: UserPasswordChangedHook,
      }))!;
      return {
        status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
        message,
        data,
      };
    }
  );

  static resetPassword = BaseController(async (request: Request) => {
    const ResetPasswordDTO = request.body as ResetPasswordDTO;
    const { success, message, data } = (await PasswordManagerModule({
      DTO: ["reset-user-password", ResetPasswordDTO],
      onSuccess: UserPasswordChangedHook,
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static resetUserPassword = BaseController(async (request: Request) => {
    const ResetPasswordDTO = request.body as ResetPasswordDTO;
    const { success, message, data } = (await PasswordManagerModule({
      DTO: ["reset-user-password", ResetPasswordDTO],
      onSuccess: UserPasswordChangedHook,
    }))!;
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });
}

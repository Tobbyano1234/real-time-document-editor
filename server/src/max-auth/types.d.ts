import { MailSendOtpDTO, TextSendOtpDTO } from "./DTOs/sendOtp.DTO";
import {
  FacebookSignInDTO,
  GoogleSignInDTO,
  LocalSignInDTO,
  TwitterSignInDTO,
} from "./DTOs/signIn.DTO";
import {
  GoogleSignUpDTO,
  LocalSignUpDTO,
  LocalSignUpUserDTO,
} from "./DTOs/signUp.DTO";
import { MailVerifyOtpDTO } from "./DTOs/verifyOtp.DTO";
import { UserSuspendAccountDTO } from "./DTOs/suspendAccount.DTO";
import {
  ChangePasswordDTO,
  VerifyUserEmailDTO,
  VerifyUserPasswordDTO,
  VerifyCompanyEmailDTO,
  ChangeCompanyStaffPasswordDTO,
  ChangeAdminPasswordDTO,
  ChangeUserPasswordDTO,
} from "./DTOs/passwordManager.DTO";
import { ResetPasswordDTO } from "./DTOs/passwordManager.DTO";
import { LoginStatusDTO } from "./DTOs/LoginStatusDTO";
import { RemoveCompanyAdminDTO, TwoFactorAuthDTO } from "./DTOs";

export type SignUp = {
  DTO: ["local", "user", LocalSignUpUserDTO];
  onSuccess: (...args: any[]) => any;
  onFailure?: (...args: any[]) => any;
};

export type SignIn = {
  DTO: ["google", GoogleSignInDTO] | ["local", "user", LocalSignInDTO];
  onSuccess: (...args: any[]) => any;
  onFailure?: (...args: any[]) => any;
};

export type SendOTP = {
  DTO: ["user", MailSendOtpDTO];
};

export type VerifyOTP = {
  DTO: ["user", MailVerifyOtpDTO];
  onSuccess: (...args: any[]) => any;
};

export type VerifyInviteCode = {
  DTO: ["basic", VerifyInviteCodeDTO];
  onSuccess: (...args: any[]) => any;
};

export type SuspendAccount = {
  DTO: ["user", UserSuspendAccountDTO];
  onSuccess: (...args: any[]) => any;
};

export type PasswordManager = {
  DTO:
    | ["verify-user-password", VerifyUserPasswordDTO]
    | ["verify-user-email", VerifyUserEmailDTO]
    | ["change-user-password", ChangeUserPasswordDTO]
    | ["reset-user-password", ResetPasswordDTO];
  onSuccess: (...args: any[]) => any;
};

export type DeactivateAccount = {
  DTO: ["user", DeactivateAccountDTO];
  onSuccess: (...args: any[]) => any;
};

export type ReturnValue = {
  success: boolean;
  message: string;
  token?: string;
  data: Record<string, any>;
  hookData?: Record<string, any>;
};

export type TwoFactorAuth = {
  DTO:
    | ["setup", TwoFactorAuthDTO]
    | ["disable", TwoFactorAuthDTO]
    | ["verify", TwoFactorAuthDTO];
  onSuccess: (...args: any[]) => any;
};

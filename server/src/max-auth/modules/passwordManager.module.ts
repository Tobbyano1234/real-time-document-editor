import { match, P } from "ts-pattern";
import { PasswordManager } from "../types";
import { triggerSuccessFailureHooks } from "../../max-shared/triggerHooks";

import {
  VerifyUserPasswordPipe,
  VerifyUserEmailPipe,
  ChangeUserPasswordPipe,
  ResetUserPasswordPipe,
} from "../pipes";


export const PasswordManagerModule = ({ DTO, onSuccess }: PasswordManager) =>
  match(DTO)
    .with(["verify-user-password", P._], async ([, VerifyPasswordDTO]) => {
      const pwdVerifyPipe = await VerifyUserPasswordPipe(VerifyPasswordDTO);
      triggerSuccessFailureHooks(pwdVerifyPipe, onSuccess);
      return pwdVerifyPipe;
    })
    .with(["verify-user-email", P._], async ([, VerifyEmailDTO]) => {
      const emailVerifyPipe = await VerifyUserEmailPipe(VerifyEmailDTO);
      return emailVerifyPipe;
    })
    .with(["change-user-password", P._], async ([, ChangePasswordDTO]) => {
      const pwdChangePipe = await ChangeUserPasswordPipe(ChangePasswordDTO);
      triggerSuccessFailureHooks(pwdChangePipe, onSuccess);
      return pwdChangePipe;
    })
    .with(["reset-user-password", P._], async ([, ResetPasswordDTO]) => {
      const pwdResetPipe = await ResetUserPasswordPipe(ResetPasswordDTO);
      triggerSuccessFailureHooks(pwdResetPipe, onSuccess);
      return pwdResetPipe;
    })
    .exhaustive();

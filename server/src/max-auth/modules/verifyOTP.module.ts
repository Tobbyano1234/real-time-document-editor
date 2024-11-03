import { match, P } from "ts-pattern";
import { VerifyOTP } from "../types";
import { triggerSuccessFailureHooks } from "../../max-shared/triggerHooks";

import {
  MailVerifyUserOtpPipe,
} from "../pipes/mail.verifyOTP.pipe";

export const verifyOTPModule = ({ DTO, onSuccess }: VerifyOTP) =>
  match(DTO)
    .with(["user", P._], async ([, MailVerifyOtpDTO]) => {
      const verifyOtpPipe = await MailVerifyUserOtpPipe(MailVerifyOtpDTO);
      triggerSuccessFailureHooks(verifyOtpPipe, onSuccess);
      return verifyOtpPipe;
    })
    .exhaustive();

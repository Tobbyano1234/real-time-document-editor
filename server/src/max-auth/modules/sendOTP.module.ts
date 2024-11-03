import { match, P } from "ts-pattern";
import { SendOTP } from "../types";

import { MailSendUserOtpPipe } from "../pipes/mail.sendOTP.pipe";

export const sendOTPModule = ({ DTO }: SendOTP) =>
  match(DTO)
    .with(["user", P._], async ([, MailSendOtpDTO]) => {
      const sendOtpPipe = await MailSendUserOtpPipe(MailSendOtpDTO);
      return sendOtpPipe;
    })
    .exhaustive();

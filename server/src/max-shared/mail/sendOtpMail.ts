import { nameFormat } from "../misc/name";
import { MailAccount } from "./typings";
import { sendMailByClient } from "../../max-messaging/services/mail";
import { config } from "../../max-web-api/config";

const sendMail = sendMailByClient();

interface IMailBody {
  account: MailAccount;
  otp: string;
  timeLeft: string;
  url?: string;
}

const verifyOtpMail = async (mailBody: IMailBody) => {
  const { account, otp, timeLeft } = mailBody;
  await sendMail({
    to: account.email,
    subject: `Entrova Account OTP`,
    text: "otpMail",
    // templateId: "account verification",
    templateId:
      "2d6f.61f3870417d54bfc.k1.9ace2ea0-2b01-11ef-9e35-5254000b1a0e.1901b6e5e8a",
    templateData: {
      firstName: nameFormat(account.firstName as string),
      lastName: nameFormat(account.lastName as string),
      otp,
      timeLeft,
      // url: `${config.entrovaFrontendAppUrl}/verify-email`,
    },
  });
};

const resetOtpMail = async (mailBody: IMailBody) => {
  const { account, otp, timeLeft } = mailBody;
  await sendMail({
    to: account.email,
    subject: `Entrova Account OTP`,
    text: "otpMail",
    // templateId: "reset password",
    templateId:
      "2d6f.61f3870417d54bfc.k1.2e0cda00-2b10-11ef-9e35-5254000b1a0e.1901bcde3a0",
    templateData: {
      firstName: nameFormat(account.firstName as string),
      lastName: nameFormat(account.lastName as string),
      otp,
      timeLeft,
      // url: `${config.generatorFrontendAppUrl}/verify-email`,
    },
  });
};

const generalOtpMail = async (mailBody: IMailBody) => {
  const {
    account,
    otp,
    timeLeft,
    url = `${config.generatorFrontendAppUrl}/verify-email`,
  } = mailBody;
  await sendMail({
    to: account.email,
    subject: account.subject || `Entrova Account OTP`,
    text: "otpMail",
    // templateId: "d-3cab1494114a4a2690973699758159d8",
    templateId:
      "2d6f.61f3870417d54bfc.k1.1045deb1-27d0-11ef-88cc-5254008f5018.19006808813",
    templateData: {
      context: account.context,
      firstName: nameFormat(account.firstName as string),
      lastName: nameFormat(account.lastName as string),
      otp,
      timeLeft,
      url,
      // subject:
    },
  });
};

const sendOtpMailByType = {
  verify: verifyOtpMail,
  reset: resetOtpMail,
  general: generalOtpMail,
};

export const sendOtpMail = async (
  mailType: "verify" | "reset" | "general",
  mailBody: {
    account: MailAccount;
    otp: string;
    timeLeft: string;
  }
) => {
  return sendOtpMailByType[mailType](mailBody);
};

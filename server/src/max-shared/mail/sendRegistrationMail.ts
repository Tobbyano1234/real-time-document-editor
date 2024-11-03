import { sendMailByClient } from "../../max-messaging/services/mail";
import { nameFormat } from "../misc";
import { MailAccount } from "./typings";

const sendMail = sendMailByClient();

export const sendRegistrationMail = async (account: MailAccount) => {
  await sendMail({
    to: account.email,
    subject: `Welcome to Our service ${
      account.firstName + " " + (account.lastName || " ")
    }`,
    // subject: `Entrova Account Created ${account.firstName + " " + (account.lastName || " ")
    text: `This is to notify you that you you have been invited to our organization on Entrova.`,
    templateId:
      "2d6f.61f3870417d54bfc.k1.64d5eb90-8500-11ef-9415-525400fa05f6.192693960c9",
    templateData: {
      firstName: nameFormat(account.firstName as string),
    },
  });
};

import { sendMailByClient } from "../../max-messaging/services/mail";
import { MailAccount } from "./typings";

const sendMail = sendMailByClient();

export const sendInvitationMail = async (account: MailAccount) => {
  await sendMail({
    to: account.email,
    subject: `Organization Invitation`,
    text: `This is to notify you that you just registered an account with us.`,
    templateId: "organization invitation",
    templateData: {
      email: account.email,
      companyName: account.companyName,
      invitationLink: account.invitationLink,
    },
  });
};

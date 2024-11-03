import { sendMailByClient } from "../../max-messaging/services/mail";
import { MailAccount } from "./typings";

const sendMail = sendMailByClient();

export const sendOrgTaskAssignNotificationMail = async (
  account: MailAccount
) => {
  await sendMail({
    to: account.email,
    subject: `New Task assigned on ${account.projectName}`,
    text: `This is to notify you that a task have been assigned to you. Kindly visit the portal for more information.`,
    // templateId: "task assigned notification mail",
    templateId:
      "2d6f.61f3870417d54bfc.k1.f67fec90-2b0e-11ef-9e35-5254000b1a0e.1901bc5e9d9",
    templateData: {
      email: account.email,
      companyName: account.companyName,
      companyEmployeeName: account.companyEmployeeName,
      projectName: account.projectName,
      taskName: account.taskName,
      taskDescription: account.taskDescription,
      // taskDueDate: account.taskDueDate,
    },
  });
};

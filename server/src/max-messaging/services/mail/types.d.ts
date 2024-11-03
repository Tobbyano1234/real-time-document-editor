// export type Attachment = {
//   filename: string;
//   content: string | Buffer;
//   encoding?: string;
//   type?: string;
// };

export type Attachment = {
  name: string;
  content: string | Buffer | ArrayBuffer;
  encoding?: string;
  mime_type?: string;
};

export interface IMailInfo {
  from?: string;
  to: string;
  attachments?: Attachment[];
  subject: string;
  text?: string;
  additionalInfo?: string;
  templateData?: Template;
  templateId?: string;
}

export type Template = {
  subject?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  timeLeft?: string;
  url?: string;
  email?: string;
  companyName?: string;
  invitationLink?: string;
  individualName?: string;
  invitationCode?: string;
  contactEmail?: string;
  companyEmployeeName?: string;
  projectName?: string;
  clientName?: string;
  invoiceNumber?: string;
  taskName?: string;
  taskDescription?: string;
  taskDueDate?: string;
  role?: string;
  context?: string;
  subject?: string;
  currency?: string;
  amount?: number;
  currencyCode?: string;
  planName?: string;
  seatsUsed?: number;
  supportUrl?: string;
  accountUrl?: string;
  updatePaymentMethodUrl?: string;
  manageSubscriptionUrl?: string;
  paymentAttemptDate?: string;
  customerName?: string;
  trialEnd?: string;
  price?: number;
  billingCycle?: string;
  nextBillingDate?: string;
  paymentDate?: string;
  invoiceUrl?: string;
  accessUntilDate?: string;
  cancelledDate?: string;
  reactivateSubscriptionUrl?: string;
  notificationType?: {
    first: boolean;
    second: boolean;
    final: boolean;
  };
  isPaid?:
    | boolean
    | {
        amount: number;
        nextBillingDate: string;
        billingCycle: string;
        cardType: string;
        cardLastFourDigits: string;
      };
  cardType?: string;
  cardLastFourDigits?: string;
  previousQuantity?: number;
  newQuantity?: number;
  newBillingAmount?: number;
  effectiveDate?: string;
  newPlanName?: string;
  oldPlanName?: string;
  submissionDate?: string;
  dashboardUrl?: string;
  approvalDate?: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  declinedReason?: string;
  newRequestUrl?: string;
};

export type InvitationTemplate = {
  email: string;
  fullName?: string;
  companyName?: string;
  invitationLink: string;
  individualName?: string;
  companyEmployeeName?: string;
  role?: string;
  // contactEmail:string;
};

export type InvoiceTemplate = {
  email: string;
  clientName: string;
  projectName: string;
  individualName: string;
  invoiceNumber: string;
};

export type TaskTemplate = {
  companyName: string;
  companyEmployeeName: string;
  projectName: string;
  taskName: string;
  taskDescription: string;
  taskDueDate?: string;
};

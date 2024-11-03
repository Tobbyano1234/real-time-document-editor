export interface createPaymentMethodBody {
  paymentMethodTypes: string[]
}
export interface verifyPaymentMethodParams {
  sessionId: string
}

export interface ISignupPayload {
  name: string
  email: string
  password: string
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface signupCompanyDetailsTypes {
  companyName: string
  companySize: string
  jobRole: string
}

export interface signupCompanyPersonalInfoRequestType {
  phoneNumber: string
  DOB: string
  nationality: string
  countryCode: string
}

export interface sendVerifyOtpReqTypes {
  email: string
  type: string
}

export interface verifyOtpReqTypes {
  email: string | undefined | null
  otp: string
  type: string
}

export interface businessDepositBody {
  amount: number | undefined
  transactionReference: string
  currency: string
}

export interface TimeOffTypes {
  startDate: string
  endDate: string
  description: string
  timeOffType: string
  totalRequestedHrs?: string
  _id?: string
}

export interface paymementRequestMethodBody {
  paymentMethodID: string
}

export interface createAdminInviteRequestTypes {
  employeeID: string
  role: string
}

export interface ProjectTimeTrackingTypes {
  status?: string
  name?: string
  description?: string
  companyID?: string
  assignedEmployees?: string[]
}

export interface createTimeTrackingTaskTypes {
  name: string
  assignedEmployees: string[]
  companyID: string
  orgProjectID: string
  id: string
}

export interface getAdminInviteReqTypes {
  token: string
  inviteCode: string
}

export interface changePasswordWithoutEmailReqTypes {
  oldPassword: string
  newPassword: string
  confirmPassword: string
  otp: string
}

export interface notificationSettingsTypes {
  all: boolean
  actionsAndCritical: boolean
  critical: boolean
  featureAnnouncement: boolean
  offerAndPromotion: boolean
  salesCommunication: boolean
}

export interface createVirtualAccountStep1Body {
  currency: string
  accountType: string
}

export interface createVirtualAccountStep2Body {
  address: {
    zip: string
    street: string
    number: string
    state: string
    city: string
  }
}

export interface createVirtualAccountStep3Body {
  document: {
    type: string
    number: string
    issuedCountryCode: string
    issuedBy: string
    issuedDate?: string
    expirationDate?: string
  }
  utilityBill: File
  bankStatement: File
  meansOfId: File
}

export interface createVirtualAccountStep4Body {
  sourceOfIncome: string
  occupation: string
  incomeBand: string
  employmentStatus: string
}

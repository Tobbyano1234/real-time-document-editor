import { ObjectId } from 'mongodb';

export type DeactivateAccountDTO = {
  userID: string;
  email: string;
  password: string;
};

export type RemoveCompanyAdminDTO = {
  companyID: ObjectId;
  employeeID: ObjectId;
};

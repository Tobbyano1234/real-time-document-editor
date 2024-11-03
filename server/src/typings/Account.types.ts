import { ModelNames } from "../max-entities";

export enum Role {
  USER = 'user',
}

export enum AccountType {
  USER = "user",
}

export enum AccountSignType {
  TWITTER = "twitter",
  GOOGLE = "google",
  FACEBOOK = "facebook",
  DIRECT = "direct",
  INVITE = "invite",
}

export interface AccountTokenType {
  _id: string;
  issuedAt: number;
  email?: string;
  accountType: AccountType;
  role?: string;
}

export enum AccountStatus {
  BANNED = "banned",
  SUSPENDED = "suspended",
  ACTIVE = "active",
  INACTIVE = "inactive",
  DEACTIVATED = "deactivated",
  TERMINATED = "terminated",
}

export type AccountMetaDataGeneral = {
  collectionName: ModelNames;
  collectionID: string;
  associatedData: {
    metaData: {
      signType: AccountSignType;
      status: AccountStatus;
      firstLoginDate: Date;
      lastLoginDate: Date;
      passwordChangedAt: Date[];
      verifiedAt: Date;
    };
  };
};

export type UploadType = {
  fileName: string;
  fileType: string;
  url: string;
};

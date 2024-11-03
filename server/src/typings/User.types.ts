import { ObjectId } from "mongodb";
import { User } from "../max-entities";
import { ModelNames } from "../max-entities/models.names";
import { AccountSignType, AccountStatus } from "./Account.types";

export type UserMetaDataGeneral = {
  _id: ObjectId;
  collectionName: ModelNames.USER;
  collectionID: string;
  associatedData: {
    type: "metaData";
    metaData: {
      signType: AccountSignType;
      status: AccountStatus;
      firstLoginDate: Date;
      lastLoginDate: Date;
      passwordChangedAt: Date[];
      verifiedAt: Date;
      deactivatedAt: Date[];
    };
  };
};

export type DeletedUserDataGeneral = {
  _id: ObjectId;
  collectionName: ModelNames.USER;
  collectionID: string;
  associatedData: {
    type: "deletedUserData";
    deletedUserData: User;
  };
};

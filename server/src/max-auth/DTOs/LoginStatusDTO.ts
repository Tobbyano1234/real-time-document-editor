import { ObjectId } from "mongodb";

export type LoginStatusDTO = {
  userID?: ObjectId;
  buyerID?: ObjectId;
  sellerID?: ObjectId;
  adminID?: ObjectId;
  token: string;
};

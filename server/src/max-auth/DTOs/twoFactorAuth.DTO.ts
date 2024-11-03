import { ObjectId } from "mongodb";

export type TwoFactorAuthDTO = {
    ownerID: ObjectId;
    token?: string;
};
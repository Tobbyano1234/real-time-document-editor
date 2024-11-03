import { model, Document, Schema } from "mongoose";
import { ModelNames } from ".";
import { AccountStatus } from "../typings/Account.types";

export class User extends Document {
  name: string;
  email: string;
  password: string;
  status: AccountStatus;
}

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: false },
    status: {
      type: String,
      enum: AccountStatus,
      default: AccountStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>(ModelNames.USER, UserSchema);

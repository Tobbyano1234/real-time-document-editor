import { ObjectId } from "mongodb"
import { Document, Schema, model } from "mongoose";
import { ModelNames } from "../../max-entities";


type SocketType = {
  socketID: string;
};

export class UserRegistry extends Document{
  userID: ObjectId;
  sockets: SocketType[];
}

const userRegistrySchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
    sockets: { type: Array },
  },
  { 
    timestamps: true,
  }
);

export const UserRegistryModel = model<UserRegistry>(ModelNames.USER_REGISTRY, userRegistrySchema);

import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
import { ModelNames } from "../../max-entities";


export enum CreatorContext {
  // USER = "user",
  SYSTEM = "system",
}

export enum TopicSubject {
  SYSTEM = "system",
  REQUEST_PICK_UP = "request_pick_up",
  REQUEST_DELIVERY = "request_delivery",
  BIN_PAYMENT = "bin_payment",
  SUBSCRIPTION = "subscription",
  WITHDRAWAL = "withdrawal"
}

export class Topic extends Document {
  subject: TopicSubject;
  creatorID: ObjectId;
  creatorContext: CreatorContext;
  subscriptionList: Array<string>;
}

const TopicSchema = new Schema(
  {
    subject: {
      type: String,
      enum: Object.values(TopicSubject), index: true
    },
    creatorID: {
      type: ObjectId,
      required: false,
      // required: true,
    },
    creatorContext: {
      type: String,
      enum: Object.values(CreatorContext),
      required: true,
      default: CreatorContext.SYSTEM
    },
    subscriptionList: {
      type: [String],
      // default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TopicModel = mongoose.model<Topic>(ModelNames.TOPIC, TopicSchema);

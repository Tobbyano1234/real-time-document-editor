import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

import { Role } from '../../typings/Account.types';
import { ModelNames } from '../../max-entities';


export enum MessageEvent {
  DOCUMENT = 'document',
}

export enum MessageType {
  LIVE = 'live',
  PERSISTED = 'persisted',
  BOTH = 'both'
};

export enum MessageStatus {
  RECEIVED = 'received',
  PENDING = 'pending',
};

export class MessageQueue {
  _id?: ObjectId;
  msgType?: MessageType;
  senderID: ObjectId;
  senderRole: Role;
  recipientID: ObjectId;
  recipientRole: Role;
  event: MessageEvent;
  body: Record<string, any>;
  receiveStatus?: MessageStatus;
  isValid?: boolean; // contextual
  sent?: boolean;
  isDeleted?: boolean;
}

const MessageQueueSchema = new Schema(
  {
    msgType: { type: String, required: true, enum: Object.values(MessageType), default: MessageType.PERSISTED },
    senderID: { type: Schema.Types.ObjectId, required: true },
    senderRole: { type: String, enum: Object.values(Role), required: true, default: Role.USER },
    recipientID: { type: Schema.Types.ObjectId, required: true },
    recipientRole: { type: String, enum: Object.values(Role), required: true, default: Role.USER },
    event: { type: String, enum: Object.values(MessageEvent), required: true },
    body: { type: Object, required: true },
    receiveStatus: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.PENDING,
    },
    isValid: { type: Boolean, default: true },
    sent: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const MessageQueueModel = mongoose.model<MessageQueue>(ModelNames.MESSAGE_QUEUE, MessageQueueSchema);

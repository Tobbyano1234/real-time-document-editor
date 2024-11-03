import { ObjectId } from "mongodb";
import { Role } from "../../typings/Account.types";
import { MessageEvent, MessageType } from "../entities/MessageQueue";
import { MessageQueueManager } from "./message.queue";

export const sendLiveMessage = async (msg: {
  msgType: MessageType;
  senderRole: Role;
  recipientRole: Role;
  event: MessageEvent;
  senderID: ObjectId;
  recipientID: ObjectId;
  body: Record<string, any>;
}) => {
  const message = { ...msg, type: MessageType.LIVE };
  await MessageQueueManager.push(message);
};


export const sendPersistedMessage = async (msg: {
  msgType: MessageType;
  senderRole: Role;
  recipientRole: Role;
  event: MessageEvent;
  senderID: ObjectId;
  recipientID: ObjectId;
  body: Record<string, any>;
}) => {
  const message = {
    msgType: MessageType.PERSISTED,
    senderRole: Role.USER,
    recipientRole: Role.USER,
    event: MessageEvent.DOCUMENT,
    senderID: msg.senderID,
    recipientID: msg.recipientID,
    body: msg.body,
  };
  await MessageQueueManager.push(message);
};


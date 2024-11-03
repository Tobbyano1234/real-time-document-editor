import { User } from "./User";
import { Documents } from "./Document";
import { UserRegistry } from "../max-push-server/entities/UserRegistry";
import { MessageQueue } from "../max-push-server/entities/MessageQueue";
import { General } from "./General";
import { TempStore } from "./TempStore";
import { Task } from "./Task";
import { Topic } from "../max-push-server/entities/Topic";

export enum ModelNames {
  USER = "user",
  DOCUMENTS = "document",
  USER_REGISTRY = "userregistry",
  MESSAGE_QUEUE = "messagequeue",
  GENERAL = "general",
  TEMP_STORE = "tempstore",
  TASK = "task",
  TOPIC = "topic",
}

export type ModelTypeMap = {
  [ModelNames.USER]: User;
  [ModelNames.DOCUMENTS]: Documents;
  [ModelNames.USER_REGISTRY]: UserRegistry;
  [ModelNames.MESSAGE_QUEUE]: MessageQueue;
  [ModelNames.GENERAL]: General;
  [ModelNames.TEMP_STORE]: TempStore;
  [ModelNames.TASK]: Task;
  [ModelNames.TOPIC]: Topic;
};

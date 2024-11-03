import { ObjectId } from "mongodb";
import { UserRegistry, UserRegistryModel } from "../entities/UserRegistry";
import { MessageQueueModel, MessageStatus } from "../entities/MessageQueue";
import { isSocketConnected, sendMessageToSocket } from "../../max-web-api/api";
import { Types } from "mongoose";

// there are a lot of TODOs
export const processUserMessages = async (connectedUsers: UserRegistry[]) => {
  await Promise.all(
    connectedUsers.map(async (connectedUser) => {
      const { userID, sockets } = connectedUser;
      const messages = await MessageQueueModel.find({
        recipientID: userID,
        isValid: true,
        isDeleted: false, // different meaning from message queue delete and application level delete
        sent: false, // fire and forget
        receiveStatus: MessageStatus.PENDING,
      });

      console.log(messages.length + " messages found for user " + userID);

      await Promise.all(
        messages.map(async (message) => {
          await Promise.all(
            sockets.map(async (socket) => {
              const isConnected = isSocketConnected(socket.socketID);
              console.log({ userID, isConnected });

              if (isConnected) {
                const received = sendMessageToSocket({
                  socketID: socket.socketID,
                  messageType: String(message.msgType),
                  message: message,
                });
                console.log({ received, id: message._id });
                await MessageQueueModel.findByIdAndUpdate(message._id, {
                  sent: received,
                  receiveStatus: MessageStatus.RECEIVED,
                });
              }
            })
          );
        })
      );
    })
  );
};

export const getAllConnectedUsers = async () => {
  const connectedUsers = await UserRegistryModel.find({ sockets: { $ne: [] } });
  console.log(`got ${connectedUsers.length} connected users`);
  return connectedUsers;
};

const getConnectedUser = async (userID: ObjectId) => {
  const connectedUser = (await UserRegistryModel.findOne({
    userID: new Types.ObjectId(userID),
  })) as UserRegistry;
  console.log(`got ${connectedUser ? 1 : 0} users`);
  return connectedUser;
};

// queue = [ ...queue, ...newQueue ]
const enQueue = (
  queue: UserRegistry[],
  userOrUsers: UserRegistry | UserRegistry[]
) => {
  if (Array.isArray(userOrUsers)) {
    console.log(`attempt to enQueue ${userOrUsers.length} users`);
    queue.push(...userOrUsers);
    console.log(userOrUsers, "userOrUsers");
    console.log(queue, "queue");
  } else {
    if (userOrUsers) {
      console.log(`attempt to enQueue 1 user`);
      queue.push(userOrUsers);
    } else {
      console.log(`no user enqueued`);
    }
  }
};

// queue = [];
const drainQueue = (queue: UserRegistry[]) => {
  console.log(`attempt to drain a queue of ${queue.length} users`);
  const connectedUsers = [...queue];
  queue.splice(0, queue.length);
  console.log(`queue drained`);
  const userIDs = [] as String[];
  console.log(`filtering distinct users`);
  console.log(
    `total number of connected users fetched ${connectedUsers.length}`
  );
  const distinctConnectedUsers = [] as UserRegistry[];
  connectedUsers.forEach((userRegistry) => {
    const { userID } = userRegistry;
    if (!userIDs.includes(String(userID))) {
      userIDs.push(String(userID));
      distinctConnectedUsers.push(userRegistry);
    }
  });
  console.log(
    `total number of distinct users fetched ${distinctConnectedUsers.length}`
  );
  return distinctConnectedUsers;
};

const processMessages = async (connectedUsers: UserRegistry[]) => {
  if (MessageProcessorEvents.running) {
    console.error("Error in handling rerun logic");
    process.exit(0);
  }

  if (!connectedUsers.length) {
    console.log("no user connected to a socket at this time");
    return;
  } else {
    console.log(`starting message processors`);
    console.log(`starting message processors connected user`, connectedUsers);
    MessageProcessorEvents.running = true;
    await processUserMessages(connectedUsers);
    MessageProcessorEvents.running = false;
    console.log(`stopped message processors`);
    if (MessageProcessorEvents.startTries > 0) {
      console.log(`restarting message processor due to previous start tries`);
      MessageProcessorEvents.startTries = 0;
      startMessageProcessor({ signal: "bkg" });
    }
  }
};

export const MessageProcessorEvents = {
  connectedUsers: [] as UserRegistry[],
  running: false,
  startTries: 0,
};
export type MessageProcessorTriggerSignal =
  | { signal: "bkg" }
  | { signal: "msgQ"; userID: ObjectId }
  | { signal: "reg"; userID: ObjectId };
export const startMessageProcessor = async (
  trigger: MessageProcessorTriggerSignal
) => {
  try {
    if (trigger.signal == "bkg") {
      console.log(`enqueueing messages from background trigger`);
      console.log(
        MessageProcessorEvents.connectedUsers,
        "MessageProcessorEvents.connectedUsers before enqueue"
      );
      enQueue(
        MessageProcessorEvents.connectedUsers,
        await getAllConnectedUsers()
      );
      console.log(
        MessageProcessorEvents.connectedUsers,
        "MessageProcessorEvents.connectedUsers after enqueue"
      );
    }
    if (trigger.signal == "reg" || trigger.signal == "msgQ") {
      console.log(
        `enqueueing messages from ${
          trigger.signal == "reg" ? "userregistry" : "message queue"
        } trigger`
      );
      enQueue(
        MessageProcessorEvents.connectedUsers,
        await getConnectedUser(trigger.userID!)
      );
    }

    console.log(`Attempt from ${trigger.signal}`);
    if (!MessageProcessorEvents.running) {
      console.log(`message processor is available`);
      console.log(`attempt to process messages`);
      await processMessages(drainQueue(MessageProcessorEvents.connectedUsers));
    } else {
      if (trigger.signal == "reg" || trigger.signal == "msgQ") {
        console.log(`message processor is unavailable`);
        MessageProcessorEvents.startTries++;
        console.log(
          `number of tries while message processor is unavailable ${MessageProcessorEvents.startTries}`
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// setInterval(startMessageProcessor, 30 * 1000, { signal: "bkg" });

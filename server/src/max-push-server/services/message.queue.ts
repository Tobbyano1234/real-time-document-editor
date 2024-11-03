// import { ObjectId } from "mongodb";
// import { Role } from "../../typings/Account.types";
// import { MessageEvent, MessageQueue, MessageQueueModel, MessageType } from "../entities/MessageQueue";
// import { startMessageProcessor } from "./message.processor";


// export class MessageQueueManager {
//   static async push(msg: {
//     msgType: MessageType;
//     senderRole: Role;
//     recipientRole: Role;
//     event: MessageEvent;
//     senderID: ObjectId;
//     recipientID: ObjectId;
//     body: Record<string, any>;
//   }) {
//     await MessageQueueModel.create(msg);
     
//     process.nextTick(() => 
//       startMessageProcessor(
//         {
//           signal: 'msgQ', 
//           userID: msg.recipientID,
//         } 
//       )
//     );

//     // trigger the message processor
//   }

//   static async pull(filter: MessageQueue) {
//     return await MessageQueueModel.find(filter) as MessageQueue[]
//   }

//   static async updateOne() {}
// }

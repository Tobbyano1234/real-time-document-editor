import { ObjectId } from "mongodb";
import { UserRegistry, UserRegistryModel } from "../entities/UserRegistry";
import { startMessageProcessor } from "./message.processor";
import { isSocketConnected } from "../../max-web-api/api";

export class UserRegistryManager {
  static async register(userID: ObjectId, socketID: string) {
    // upsert
    let isUserExistsInRegistry = (await UserRegistryModel.findOne({
      userID,
    })) as UserRegistry;
    if (isUserExistsInRegistry) {
      await UserRegistryModel.findByIdAndUpdate(isUserExistsInRegistry._id, {
        $push: {
          sockets: { socketID },
        },
      });
      console.log(userID + ":: old user successfully registered.. >> ");
    } else {
      await UserRegistryModel.create({
        userID,
        sockets: [{ socketID }],
      });
      console.log(userID + ":: new user successfully registered.. >> ");
    }

    // trigger message processor
    // process.nextTick(() =>
    //   startMessageProcessor({
    //     signal: "reg",
    //     userID,
    //   })
    // );
  }

  static async pop(userID: ObjectId, socketID: string) {
    await UserRegistryModel.updateOne(
      { userID },
      { $pull: { sockets: { socketID } } }
    );
  }

  static async deleteUser() {}

  static async purgeDisconnectedSockets() {
    const allUsers = await UserRegistryModel.find({});
    console.log("attempting to disconnect sockets");
    await Promise.all(
      allUsers.map(async (user) => {
        const { userID, sockets } = user;
        await Promise.all(
          sockets.map(async (socket) => {
            const { socketID } = socket;
            const isConnected = isSocketConnected(socketID);
            if (!isConnected) {
              console.log("socket disconnected");
              await UserRegistryManager.pop(userID, socketID);
            }
          })
        );
      })
    );
  }
}

setInterval(UserRegistryManager.purgeDisconnectedSockets, 35 * 1000);

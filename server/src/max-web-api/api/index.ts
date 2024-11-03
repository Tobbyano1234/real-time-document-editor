import { MessageQueue } from "../../max-push-server/entities/MessageQueue";
import { SocketHandler } from "../../max-push-server/services/push.server";
import { GeneralServerTask } from "../../max-scheduler/main";
import { config, Server, startDB } from "../config";
import app from "./app";
import { Server as SocketIO, ServerOptions } from "socket.io";
// import { YJSWebSocketServer } from "../../max-push-server/services/yjs.server";

const port = config.port;

let pushServer: SocketIO; // pushServer doesn't have a value

// export const startServer = () => {
//   const server = Server(app, port);
//   if (config.env === "test") {
//     return server.test();
//   }

//   const httpServer = server.live();
//   const dbManager = startDB();

//   dbManager.live(async () => {
//     // Initialize YJS WebSocket server with the HTTP server instance
//     YJSWebSocketServer.initialize(httpServer);

//     const serverTask = await GeneralServerTask();
//     serverTask.payload!.start();
//   });

//   return httpServer;
// };

// export const MainServer = {
//   httpServer: startServer(),
//   ioServerOptions: {
//     cors: {
//       origin: "*",
//       credentials: true,
//     },
//   } as Partial<ServerOptions>,
// };




export const startServer = () => {
  const server = Server(app, port);
  if (config.env === "test") {
    /**
     * Mock servers may be called at test point
     */
    return server.test();
  }
  const dbManager = startDB();
  dbManager.live(async () => {
    pushServer = new SocketIO(
      MainServer.httpServer,
      MainServer.ioServerOptions
    );

    pushServer.use(SocketHandler.authTokenMiddleware);
    pushServer.use(SocketHandler.authIdentityMiddleware);

    pushServer.on("connection", SocketHandler.connectionHandler);

    // Initialize YJS WebSocket server
    // YJSWebSocketServer.initialize(MainServer.httpServer);

    const serverTask = await GeneralServerTask();
    serverTask.payload!.start();
  });
  return server.live();
};

export const MainServer = {
  httpServer: startServer(),
  ioServerOptions: {
    cors: {
      origin: "*",
      credentials: true,
    },
  } as Partial<ServerOptions>,
};

// concurrency
// callback
export const isSocketConnected = (socketID: string) => {
  console.log(`pushServer.sockets ${socketID}`);
  const isConnected = !!pushServer.sockets.sockets.get(socketID);
  console.log(isConnected);
  return isConnected;
};

export interface sendMsgToSktInterface {
  socketID: string;
  messageType: string;
  message: MessageQueue;
}

export const sendMessageToSocket = ({
  socketID,
  messageType,
  message,
}: sendMsgToSktInterface) => {
  console.log("am called for emit");
  return pushServer.to(socketID).emit(messageType, message);
};

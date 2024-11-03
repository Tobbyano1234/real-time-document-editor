// import { Server } from "http";
// import * as Y from "yjs";
// import * as ws from "ws";
// import * as awarenessProtocol from "y-protocols/awareness";
// import * as syncProtocol from "y-protocols/sync";
// import { verifyToken } from "../../max-auth/plugins";
// import { encoding, decoding } from "lib0";

// const MAX_MESSAGE_SIZE = 1024 * 1024; // 1MB limit for messages

// export class YJSWebSocketServer {
//   private static instance: ws.Server;
//   private static docs: Map<string, Y.Doc> = new Map();
//   private static awarenessMap: Map<string, awarenessProtocol.Awareness> =
//     new Map();

//   static initialize(httpServer: Server) {
//     if (!this.instance) {
//       this.instance = new ws.Server({
//         server: httpServer,
//         noServer: false,
//         maxPayload: MAX_MESSAGE_SIZE,
//         verifyClient: async (info, cb) => {
//           try {
//             const url = new URL(info.req.url!, `ws://${info.req.headers.host}`);
//             const token = url.searchParams.get("token");

//             if (!token) {
//               cb(false, 401, "Unauthorized");
//               return;
//             }

//             const decoded = await verifyToken(token);
//             if (!decoded) {
//               cb(false, 401, "Invalid token");
//               return;
//             }

//             cb(true);
//           } catch (error) {
//             console.error("WebSocket verification error:", error);
//             cb(false, 500, "Internal Server Error");
//           }
//         },
//       });

//       this.instance.on("connection", (socket: ws, request) => {
//         console.log("Client connected to YJS WebSocket");

//         try {
//           const url = new URL(request.url!, `ws://${request.headers.host}`);
//           const docId = url.pathname.split("/")[2];

//           if (!docId) {
//             socket.close(1002, "Invalid document ID");
//             return;
//           }

//           let doc = this.docs.get(docId);
//           if (!doc) {
//             doc = new Y.Doc();
//             this.docs.set(docId, doc);
//           }

//           let awareness = this.awarenessMap.get(docId);
//           if (!awareness) {
//             awareness = new awarenessProtocol.Awareness(doc);
//             this.awarenessMap.set(docId, awareness);
//           }

//           // Send initial sync step 1 - Send the state vector
//           const encoder = encoding.createEncoder();
//           encoding.writeVarUint(encoder, 0); // Message type for sync step 1
//           syncProtocol.writeSyncStep1(encoder, doc); // Fix argument order
//           socket.send(encoding.toUint8Array(encoder));

//           socket.on("message", (message: ws.Data) => {
//             try {
//               if (
//                 !(
//                   message instanceof ArrayBuffer ||
//                   message instanceof Uint8Array
//                 )
//               ) {
//                 console.warn("Received non-binary message, ignoring.");
//                 return;
//               }

//               const m = new Uint8Array(message as ArrayBuffer);

//               // Validate message size
//               if (m.byteLength === 0 || m.byteLength > MAX_MESSAGE_SIZE) {
//                 console.warn(`Invalid message size: ${m.byteLength} bytes`);
//                 return;
//               }

//               const messageType = m[0];
//               const decoder = decoding.createDecoder(m.slice(1)); // Skip the first byte (message type)

//               switch (messageType) {
//                 case 0: {
//                   // Sync step 1
//                   const encoder = encoding.createEncoder();
//                   encoding.writeVarUint(encoder, 1); // Message type for sync step 2
//                   syncProtocol.writeSyncStep2(encoder, doc, decoding.readVarUint8Array(decoder)); // Read update as Uint8Array
//                   socket.send(encoding.toUint8Array(encoder));
//                   break;
//                 }
//                 case 1: {
//                   // Sync step 2
//                   syncProtocol.readSyncStep2(decoder, doc, "update");
//                   break;
//                 }
//                 case 2: {
//                   // Update
//                   Y.applyUpdate(doc, decoding.readVarUint8Array(decoder));
//                   const encoder = encoding.createEncoder();
//                   encoding.writeVarUint(encoder, 2);
//                   encoding.writeVarUint8Array(
//                     encoder,
//                     Y.encodeStateAsUpdate(doc)
//                   );
//                   this.broadcastToOthers(
//                     socket,
//                     encoding.toUint8Array(encoder)
//                   );
//                   break;
//                 }
//                 case 3: {
//                   // Awareness update
//                   awarenessProtocol.applyAwarenessUpdate(awareness, m.slice(1), "update");
//                   this.broadcastAwarenessUpdate(socket, docId, m);
//                   break;
//                 }
//                 default:
//                   console.warn(`Unknown message type: ${messageType}`);
//               }
//             } catch (error) {
//               console.error("Error processing message:", error);
//               // Don't close the connection for processing errors
//             }
//           });

//           // Handle client disconnection
//           socket.on("close", () => {
//             try {
//               // Remove client from awareness
//               awarenessProtocol.removeAwarenessStates(
//                 awareness,
//                 [doc.clientID],
//                 "connection closed"
//               );
//               console.log("Client disconnected from YJS WebSocket");
//             } catch (error) {
//               console.error("Error during cleanup:", error);
//             }
//           });

//           // Handle errors
//           socket.on("error", (error) => {
//             console.error("WebSocket error:", error);
//             try {
//               socket.close(1011, "Internal server error");
//             } catch (e) {
//               console.error("Error while closing socket:", e);
//             }
//           });
//         } catch (error) {
//           console.error("Error during connection setup:", error);
//           socket.close(1011, "Internal server error");
//         }
//       });
//     }
//     return this.instance;
//   }

//   private static broadcastAwarenessUpdate(
//     socket: ws,
//     docId: string,
//     update: Uint8Array
//   ) {
//     this.instance.clients.forEach((client) => {
//       if (client !== socket && client.readyState === ws.OPEN) {
//         try {
//           client.send(update);
//         } catch (error) {
//           console.error("Error broadcasting awareness update:", error);
//         }
//       }
//     });
//   }

//   private static broadcastToOthers(socket: ws, message: Uint8Array) {
//     this.instance.clients.forEach((client) => {
//       if (client !== socket && client.readyState === ws.OPEN) {
//         try {
//           client.send(message);
//         } catch (error) {
//           console.error("Error broadcasting message:", error);
//         }
//       }
//     });
//   }
// }

// // import { Server } from "http";
// // import * as Y from "yjs";
// // import * as ws from "ws";
// // import * as awarenessProtocol from "y-protocols/awareness";
// // import * as syncProtocol from "y-protocols/sync";
// // import { verifyToken } from "../../max-auth/plugins";
// // import { encoding, decoding } from "lib0";

// // export class YJSWebSocketServer {
// //   private static instance: ws.Server;
// //   private static docs: Map<string, Y.Doc> = new Map();
// //   private static awarenessMap: Map<string, awarenessProtocol.Awareness> =
// //     new Map();

// //   static initialize(httpServer: Server) {
// //     if (!this.instance) {
// //       this.instance = new ws.Server({
// //         server: httpServer,
// //         noServer: false,
// //         verifyClient: async (info, cb) => {
// //           try {
// //             const url = new URL(info.req.url!, `ws://${info.req.headers.host}`);
// //             const token = url.searchParams.get("token");

// //             if (!token) {
// //               cb(false, 401, "Unauthorized");
// //               return;
// //             }

// //             const decoded = await verifyToken(token);
// //             if (!decoded) {
// //               cb(false, 401, "Invalid token");
// //               return;
// //             }

// //             cb(true);
// //           } catch (error) {
// //             console.error("WebSocket verification error:", error);
// //             cb(false, 500, "Internal Server Error");
// //           }
// //         },
// //       });

// //       this.instance.on("connection", (socket: ws, request) => {
// //         console.log("Client connected to YJS WebSocket");
// //         const url = new URL(request.url!, `ws://${request.headers.host}`);
// //         const docId = url.pathname.split("/")[2];
// //         let doc = this.docs.get(docId) || new Y.Doc();
// //         this.docs.set(docId, doc);

// //         let awareness =
// //           this.awarenessMap.get(docId) || new awarenessProtocol.Awareness(doc);
// //         this.awarenessMap.set(docId, awareness);

// //         socket.on("message", (message: ws.Data) => {
// //           try {
// //             if (
// //               !(message instanceof ArrayBuffer || message instanceof Uint8Array)
// //             ) {
// //               console.warn("Received non-binary message, ignoring.");
// //               return;
// //             }

// //             const m = new Uint8Array(message as ArrayBuffer);
// //             if (m.byteLength === 0) {
// //               console.warn("Received empty message, ignoring.");
// //               return;
// //             }

// //             const messageType = m[0];
// //             if (messageType === 0) {
// //               // Sync message
// //               const encoder = encoding.createEncoder();
// //               const decoder = decoding.createDecoder(m);

// //               syncProtocol.readSyncMessage(decoder, encoder, doc, "server");

// //               // Broadcast changes to all other clients
// //               const update = Y.encodeStateAsUpdate(doc);
// //               this.broadcastToOthers(socket, update);
// //             } else if (messageType === 1) {
// //               // Awareness message
// //               awarenessProtocol.applyAwarenessUpdate(awareness, m, "server");
// //             }
// //           } catch (error) {
// //             console.error("Error processing message:", error);
// //           }
// //         });

// //         socket.on("close", () => {
// //           awareness.destroy();
// //           console.log("Client disconnected from YJS WebSocket");
// //         });
// //       });
// //     }
// //     return this.instance;
// //   }

// //   private static broadcastToOthers(socket: ws, message: Uint8Array) {
// //     this.instance.clients.forEach((client) => {
// //       if (client !== socket && client.readyState === ws.OPEN) {
// //         client.send(message);
// //       }
// //     });
// //   }
// // }

// // import { Server } from "http";
// // import * as Y from "yjs";
// // import * as ws from "ws";
// // import * as awarenessProtocol from "y-protocols/awareness";
// // import * as syncProtocol from "y-protocols/sync";
// // // import * as lib0 from "lib0"; // Import lib0 for decoding
// // import { verifyToken } from "../../max-auth/plugins";
// // import { encoding, decoding } from "lib0";

// // export class YJSWebSocketServer {
// //   private static instance: ws.Server;
// //   private static docs: Map<string, Y.Doc> = new Map();
// //   private static awarenessMap: Map<string, awarenessProtocol.Awareness> =
// //     new Map();

// //   static initialize(httpServer: Server) {
// //     if (!this.instance) {
// //       this.instance = new ws.Server({
// //         server: httpServer,
// //         noServer: false,
// //         // path: "/yjs",
// //         verifyClient: async (info, cb) => {
// //           try {
// //             const url = new URL(info.req.url!, `ws://${info.req.headers.host}`);
// //             const token = url.searchParams.get("token");

// //             if (!token) {
// //               cb(false, 401, "Unauthorized");
// //               return;
// //             }

// //             const decoded = await verifyToken(token);
// //             if (!decoded) {
// //               cb(false, 401, "Invalid token");
// //               return;
// //             }

// //             cb(true);
// //           } catch (error) {
// //             console.error("WebSocket verification error:", error);
// //             cb(false, 500, "Internal Server Error");
// //           }
// //         },
// //       });

// //       this.instance.on("connection", async (socket: ws, request) => {
// //         try {
// //           console.log("Client connected to YJS WebSocket");
// //           const url = new URL(request.url!, `ws://${request.headers.host}`);
// //           const docId = url.pathname.split("/")[2]; // Get the last segment of the path
// //           //   const docId = url.pathname.split('/').pop(); // Get the last segment of the path
// //           console.log("docId", docId);
// //           let doc = this.docs.get(docId);
// //           console.log("doc", doc);
// //           if (!doc) {
// //             doc = new Y.Doc();
// //             this.docs.set(docId, doc);
// //           }

// //           let awareness = this.awarenessMap.get(docId);
// //           if (!awareness) {
// //             awareness = new awarenessProtocol.Awareness(doc);
// //             this.awarenessMap.set(docId, awareness);
// //           }

// //           socket.on("message", (message: ws.Data) => {
// //             try {
// //               const m = new Uint8Array(message as ArrayBuffer);
// //               if (m.byteLength > 0) {
// //                 const messageType = m[0];

// //                 // Handle sync message
// //                 if (messageType === 0) {
// //                   // Sync message
// //                   const encoder = encoding.createEncoder();
// //                   const decoder = decoding.createDecoder(m);
// //                   const syncMessageType = syncProtocol.readSyncMessage(
// //                     decoder,
// //                     encoder,
// //                     doc,
// //                     "server"
// //                   );

// //                   if (syncMessageType) {
// //                     // Broadcast changes to all other clients
// //                     const update = Y.encodeStateAsUpdate(doc);
// //                     this.broadcastToOthers(socket, update);
// //                   }
// //                 }
// //                 // Handle awareness update
// //                 else if (messageType === 1) {
// //                   // Awareness message
// //                   awarenessProtocol.applyAwarenessUpdate(
// //                     awareness,
// //                     m,
// //                     "server"
// //                   );
// //                 }
// //               }
// //             } catch (error) {
// //               console.error("Error processing message:", error);
// //             }
// //           });

// //           socket.on("close", () => {
// //             awareness.destroy();
// //             console.log("Client disconnected from YJS WebSocket");
// //           });
// //         } catch (error) {
// //           console.error("WebSocket error:", error);
// //           socket.close(1011, "Internal Server Error");
// //         }
// //       });
// //     }
// //     return this.instance;
// //   }

// //   private static broadcastToOthers(socket: ws, message: Uint8Array) {
// //     this.instance.clients.forEach((client) => {
// //       if (client !== socket && client.readyState === ws.OPEN) {
// //         client.send(message);
// //       }
// //     });
// //   }
// // }

import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { Socket } from "socket.io";
// import { config } from "../../max-web-api/config";
import { verifyToken } from "../../max-auth/plugins";
import { UserRegistryManager } from "./user.registry";
import { AccountTokenType } from "../../typings/Account.types";
import { DocumentsModel, UserModel } from "../../max-entities";
import { GetAllDocumentsPipe } from "../../max-document/pipes";
import { GetAllDocumentsDTO } from "../../max-document/DTOs/GetDocumentDTO";
import { toObjectId } from "../../max-shared";

type socketAuthType = {
  // serverPublicToken: string;
  token?: string;
  userID?: ObjectId; // we don't need this
};

type socketDataType = {
  userID?: ObjectId; // not taking it
  userToken?: AccountTokenType;
};

export class SocketHandler {
  // 2 assumptions

  static async authTokenMiddleware(
    socket: Socket,
    next: (...args: any[]) => void
  ) {
    try {
      const { token: registeredUserToken } = socket.handshake
        .auth as socketAuthType;

      // const { token: registeredUserToken } = socket.handshake.auth as socketAuthType || socket.handshake.headers as unknown as Partial<socketAuthType>;
      // const serverPublicToken = socket.handshake.headers.serverpublictoken as string;
      // const registeredUserToken = socket.handshake.headers.token as string;

      // console.log("serverPublicToken", serverPublicToken);
      // if (!serverPublicToken) {
      //   next(new Error("Socket Auth Error: no public token found"));
      //   throw new Error("Socket Auth Error: no public token found");
      // }

      // all the gues
      // console.log(config.credentials.token.serverPublicToken);
      // if (serverPublicToken !== config.credentials.token.serverPublicToken) {
      //   next(new Error(`Socket Auth error: wrong public token`));
      //   throw new Error(`Socket Auth error: wrong public token`);
      // }

      if (registeredUserToken) {
        // trycatch
        try {
          const decoded = (await verifyToken(
            registeredUserToken
          )) as AccountTokenType;
          console.log("decoded", { decoded });
          socket.data.userToken = decoded;
        } catch (error) {
          console.log(error);
        }
      }
      next();
    } catch (err: any) {
      console.log(err);
    }
  }

  static async authIdentityMiddleware(
    socket: Socket,
    next: (...args: any[]) => void
  ) {
    try {
      const { data } = socket;
      const { userToken } = data as socketDataType;

      if (!userToken) {
        next(new Error(`Socket data error: userToken required`));
        throw new Error(`Socket data error: userToken required`);
      }

      const userID = userToken._id;
      const userExists = await UserModel.findById(userID);
      if (!userExists) {
        next(new Error(`Socket identity error: user ${userID} does not exist`));
        throw new Error(`Socket identity error: user ${userID} does not exist`);
      } else {
        next();
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  static async connectionHandler(socket: Socket) {
    socket.on("message", SocketHandler.messageHandler(socket));

    const { id: socketID, data } = socket;
    const { userToken } = data as socketDataType;
    const { _id: __id } = userToken!;
    const userID = new Types.ObjectId(__id);

    console.log("userID", userID);
    console.log("socketID", socketID);
    console.log("data", { data });

    socket.on(
      "get-all-documents",
      async ({ page = 1, limit = 10, search = "" }) => {
        const filter: GetAllDocumentsDTO = { userID, page, limit };
        if (search) filter.search = search;
        const allDocuments = await GetAllDocumentsPipe(filter);
        allDocuments.data.reverse(); // To get most recent docs first.
        socket.emit("all-documents", allDocuments);
      }
    );

    // socket.on("get-document", async ({ documentId, documentName }) => {
    //   socket.join(documentId);
    //   try {
    //     const document = await DocumentsModel.findOne({
    //       documentID: documentId,
    //     });

    //     if (document) {
    //       // Send the document content
    //       socket.emit("load-document", {
    //         content: document.data.content,
    //         type: document.data.type,
    //       });
    //     } else {
    //       // Create new document with empty content
    //       const newDocument = await DocumentsModel.create({
    //         documentID: documentId,
    //         name: documentName || "Untitled Document",
    //         data: {
    //           content: { ops: [{ insert: "\n" }] }, // Empty Quill Delta
    //           type: "rich-text",
    //         },
    //         author: {
    //           userID,
    //           createdAt: new Date(),
    //         },
    //         metadata: {
    //           lastModified: new Date(),
    //           lastModifiedBy: userID,
    //           size: 0,
    //         },
    //         settings: {
    //           isPublic: false,
    //           allowComments: true,
    //           versioningEnabled: true,
    //         },
    //       });
    //       socket.emit("load-document", {
    //         content: newDocument.data.content,
    //         type: newDocument.data.type,
    //       });
    //     }

    //     // Handle document updates
    //     socket.on("doc-update", async ({ content }) => {
    //       // Broadcast changes to other clients in the room
    //       socket.to(documentId).emit("receive-changes", content);
    //     });

    //     // Handle document saves
    //     socket.on("save-document", async ({ content }) => {
    //       try {
    //         await DocumentsModel.findOneAndUpdate(
    //           { documentID: documentId },
    //           {
    //             $set: {
    //               "data.content": content,
    //               "metadata.lastModified": new Date(),
    //               "metadata.lastModifiedBy": userID,
    //             },
    //           },
    //           { new: true }
    //         );
    //       } catch (error) {
    //         console.error("Error saving document:", error);
    //       }
    //     });

    //     // Handle document updates
    //     // socket.on("doc-update", async ({ content, documentId }) => {
    //     //   try {
    //     //     // Save the Quill Delta content
    //     //     await DocumentsModel.findOneAndUpdate(
    //     //       {
    //     //         documentID: documentId,
    //     //         $or: [
    //     //           { 'author.userID': userID },
    //     //           { 'collaborators.userID': userID, 'collaborators.permission': { $in: ['WRITE', 'ADMIN'] } }
    //     //         ]
    //     //       },
    //     //       {
    //     //         $set: {
    //     //           'data.content': content, // Store the Quill Delta
    //     //           'metadata.lastModified': new Date(),
    //     //           'metadata.lastModifiedBy': userID
    //     //         }
    //     //       },
    //     //       { new: true }
    //     //     );

    //     //     // Broadcast to other clients
    //     //     socket.to(documentId).emit("receive-changes", content);
    //     //   } catch (error) {
    //     //     console.error('Error handling document update:', error);
    //     //   }
    //     // });

    //     // // When saving document
    //     // socket.on("save-document", async ({ documentId, content }) => {
    //     //   const document = await DocumentsModel.findOne({ documentId });

    //     //   if (!document?.canUserEdit(userID)) {
    //     //     socket.emit("error", { message: "Permission denied" });
    //     //     return;
    //     //   }

    //     //   // Update version history if enabled
    //     //   document.updateVersion(content, userID);

    //     //   // Update the document content
    //     //   document.data.content = content;
    //     //   document.metadata.lastModified = new Date();
    //     //   document.metadata.lastModifiedBy = userID;

    //     //   await document.save();
    //     // });

    //     // Handle cursor updates
    //     socket.on("cursor-update", (data) => {
    //       socket.to(documentId).emit("cursor-update", data);
    //     });

    //     // Clean up on disconnect
    //     socket.on("disconnect", async () => {
    //       try {
    //         await DocumentsModel.findOneAndUpdate(
    //           { documentID: documentId },
    //           {
    //             $pull: { activeUsers: { userID: userID } },
    //           }
    //         );
    //       } catch (error) {
    //         console.error("Error removing active user:", error);
    //       }
    //     });
    //   } catch (error) {
    //     console.error('Error in get-document:', error);
    //   }
    // });

    socket.on("get-document", async ({ documentId }, callback) => {
      try {
        socket.join(documentId);

        const document = await DocumentsModel.findOne({
          documentID: documentId,
        });

        // Handle YJS updates
        socket.on("yjs-update", ({ update }) => {
          socket.to(documentId).emit("yjs-update", { update });
        });

        // Handle awareness updates
        socket.on("awareness-update", ({ states }) => {
          socket.to(documentId).emit("awareness-update", { states });
        });

        // Update active users
        await DocumentsModel.findOneAndUpdate(
          { documentID: documentId },
          {
            $pull: { activeUsers: { userID } },
          }
        );

        await DocumentsModel.findOneAndUpdate(
          { documentID: documentId },
          {
            $push: {
              activeUsers: {
                userID,
                userName: userToken?.name,
                color: getRandomColor(userID.toString()),
                lastActive: new Date(),
              },
            },
          }
        );

        // Get updated active users
        const updatedDoc = await DocumentsModel.findOne({
          documentID: documentId,
        });
        const activeUsers =
          updatedDoc?.activeUsers.map((user) => ({
            userId: user.userID.toString(),
            userName: user.userID,
            color: user.color,
          })) || [];

        // Broadcast active users to all clients in the room
        socket.to(documentId).emit("active-users", activeUsers);

        if (document) {
          callback(document);
        } else {
          const newDocument = await DocumentsModel.create({
            documentID: documentId,
            name: "Untitled Document",
            data: {
              content: { ops: [{ insert: "\n" }] },
              type: "rich-text",
            },
            author: {
              userID,
              createdAt: new Date(),
            },
            metadata: {
              lastModified: new Date(),
              lastModifiedBy: userID,
              size: 0,
            },
            settings: {
              isPublic: false,
              allowComments: true,
              versioningEnabled: true,
            },
            activeUsers: [
              {
                userID,
                userName: "Tobby",
                // userName: userToken.name,
                color: getRandomColor(userID.toString()),
                lastActive: new Date(),
              },
            ],
          });

          callback(newDocument);
        }

        // Handle cursor updates
        socket.on(
          "cursor-update",
          async ({ userId, userName, range, color }) => {
            socket.to(documentId).emit(
              "cursor-update",
              {
                userId,
                userName,
                range,
                color,
              },
              callback
            );

            // Update user's last active timestamp and cursor position
            const doc = await DocumentsModel.findOneAndUpdate(
              {
                documentID: documentId,
                "activeUsers.userID": userID,
              },
              {
                $set: {
                  "activeUsers.$.lastActive": new Date(),
                  "activeUsers.$.cursor": range,
                },
              }
            );
            callback(doc);
          }
        );

        // Handle disconnection
        const handleDisconnect = async () => {
          try {
            await DocumentsModel.findOneAndUpdate(
              { documentID: documentId },
              {
                $pull: { activeUsers: { userID } },
              }
            );

            const updatedDoc = await DocumentsModel.findOne({
              documentID: documentId,
            });
            const remainingUsers =
              updatedDoc?.activeUsers.map((user) => ({
                userId: user.userID.toString(),
                userName: user.userName,
                color: user.color,
              })) || [];

            socket.to(documentId).emit("active-users", remainingUsers);
            // Cleanup on disconnect
            socket.on("disconnect", async () => {
              socket.leave(documentId);
            });
          } catch (error) {
            console.error("Error handling disconnect:", error);
          }
        };

        socket.on("disconnect", handleDisconnect);
        socket.on("leave-document", handleDisconnect);
      } catch (error) {
        console.error("Error in get-document:", error);
        callback(null);
      }
    });

    // In your SocketHandler class
    socket.on(
      "join-document",
      async ({ documentId, userId, userName, userColor }) => {
        try {
          socket.join(documentId);

          // Update document's active users
          await DocumentsModel.findOneAndUpdate(
            { documentID: documentId },
            {
              $pull: { activeUsers: { userID: new Types.ObjectId(userId) } },
            }
          );

          await DocumentsModel.findOneAndUpdate(
            { documentID: documentId },
            {
              $push: {
                activeUsers: {
                  userID: new Types.ObjectId(userId),
                  userName,
                  color: userColor,
                  lastActive: new Date(),
                },
              },
            }
          );

          // Get and broadcast updated active users list
          const document = await DocumentsModel.findOne({
            documentID: documentId,
          });
          if (document) {
            const activeUsers = document.activeUsers.map((user) => ({
              userId: user.userID.toString(),
              userName: user.userName,
              color: user.color,
            }));

            // Broadcast to all clients in the room
            socket.to(documentId).emit("active-users", activeUsers);
          }
        } catch (error) {
          console.error("Error in join-document:", error);
        }
      }
    );

    // Update the get-document handler to use acknowledgment
    // socket.on("get-document", async ({ documentId }, callback) => {
    //   try {
    //     socket.join(documentId);

    //     const document = await DocumentsModel.findOne({
    //       documentID: documentId,
    //     });

    //     if (document) {
    //       // Send document through callback
    //       callback(document);
    //     } else {
    //       // Create new document with empty Quill Delta
    //       const newDocument = await DocumentsModel.create({
    //         documentID: documentId,
    //         name: "Untitled Document",
    //         data: {
    //           content: { ops: [{ insert: "\n" }] },
    //           type: "rich-text",
    //         },
    //         author: {
    //           userID: userID,
    //           createdAt: new Date(),
    //         },
    //         metadata: {
    //           lastModified: new Date(),
    //           lastModifiedBy: userID,
    //           size: 0,
    //         },
    //         settings: {
    //           isPublic: false,
    //           allowComments: true,
    //           versioningEnabled: true,
    //         },
    //       });

    //       // Send new document through callback
    //       callback(newDocument);
    //     }
    //   } catch (error) {
    //     console.error("Error in get-document:", error);
    //     callback(null); // Send null in case of error
    //   }
    // });

    // socket.on("get-document", async ({ documentId }, callback) => {
    //   socket.join(documentId);
    //   try {
    //     const document = await DocumentsModel.findOne({
    //       documentID: documentId,
    //     });
    //     console.log("document", { document });
    //     if (document) {
    //       console.log("document found");
    //       socket.emit("load-document", {
    //         content: document.data.content, // Quill Delta format
    //         type: document.data.type,
    //       });
    //       callback(document);
    //     } else {
    //       // Create new document with empty Quill Delta
    //       const newDocument = await DocumentsModel.create({
    //         documentID: documentId,
    //         name: "Untitled Document",
    //         data: {
    //           content: { ops: [{ insert: "\n" }] }, // Empty Quill Delta
    //           type: "rich-text",
    //         },
    //         author: {
    //           userID: userID,
    //           createdAt: new Date(),
    //         },
    //         metadata: {
    //           lastModified: new Date(),
    //           lastModifiedBy: userID,
    //           size: 0,
    //         },
    //         settings: {
    //           isPublic: false,
    //           allowComments: true,
    //           versioningEnabled: true,
    //         },
    //       });
    //       callback(newDocument);
    //       socket.emit("load-document", {
    //         content: newDocument.data.content,
    //         type: newDocument.data.type,
    //       });
    //     }

    // Handle document updates
    socket.on("doc-update", async ({ content, documentId }) => {
      socket.to(documentId).emit("receive-changes", content);
    });

    // Handle document saves
    socket.on("save-document", async ({ content, documentId }) => {
      try {
        await DocumentsModel.findOneAndUpdate(
          { documentID: documentId },
          {
            $set: {
              "data.content": content, // Save as Quill Delta
              "metadata.lastModified": new Date(),
              "metadata.lastModifiedBy": userID,
            },
          },
          { new: true }
        );

        // Optionally save a version if versioning is enabled
        const document = await DocumentsModel.findOne({
          documentID: documentId,
        });
        if (document && document.settings.versioningEnabled) {
          document.updateVersion(content, new Types.ObjectId(userID));
          await document.save();
        }
      } catch (error) {
        console.error("Error saving document:", error);
      }
    });
    //   } catch (error) {
    //     console.error("Error in get-document:", error);
    //   }
    // });

    // Join document handler
    // socket.on(
    //   "join-document",
    //   async ({ documentId, userId, userName, color, cursor, selection }) => {
    //     try {
    //       socket.join(documentId);

    //       // Update document's active users
    //       await DocumentsModel.findOneAndUpdate(
    //         { documentID: documentId },
    //         {
    //           $pull: {
    //             // First remove any existing entry for this user
    //             activeUsers: {
    //               userID: userID,
    //             },
    //           },
    //         }
    //       );

    //       // Add the user with new presence data
    //       await DocumentsModel.findOneAndUpdate(
    //         { documentID: documentId },
    //         {
    //           $push: {
    //             activeUsers: {
    //               userID: userID,
    //               lastActive: new Date(),
    //               cursor: cursor,
    //               selection: selection,
    //               color: color,
    //               userName: userName,
    //             },
    //           },
    //         }
    //       );

    //       // Get and broadcast updated active users
    //       const document = await DocumentsModel.findOne({
    //         documentID: documentId,
    //       });
    //       if (document) {
    //         socket.to(documentId).emit("active-users", document.activeUsers);
    //       }

    //       // Handle cursor updates
    //       socket.on(
    //         "cursor-update",
    //         async ({ documentId, userId, userName, range, color }) => {
    //           socket.to(documentId).emit("cursor-update", {
    //             userId,
    //             userName,
    //             range,
    //             color,
    //           });
    //           await DocumentsModel.findOneAndUpdate(
    //             {
    //               documentID: documentId,
    //               "activeUsers.userID": userId,
    //             },
    //             {
    //               $set: {
    //                 "activeUsers.$.lastActive": new Date(),
    //                 "activeUsers.$.cursor": range,
    //               },
    //             }
    //           );
    //         }
    //       );

    //       // Handle disconnection and document leave
    //       const handleLeave = async () => {
    //         try {
    //           // Remove user from active users
    //           await DocumentsModel.findOneAndUpdate(
    //             { documentID: documentId },
    //             {
    //               $pull: {
    //                 activeUsers: {
    //                   userID: toObjectId(userId),
    //                 },
    //               },
    //             }
    //           );

    //           // Get and broadcast updated active users
    //           const document = await DocumentsModel.findOne({
    //             documentID: documentId,
    //           });
    //           if (document) {
    //             socket
    //               .to(documentId)
    //               .emit("active-users", document.activeUsers);
    //           }

    //           socket.leave(documentId);
    //         } catch (error) {
    //           console.error("Error handling user leave:", error);
    //         }
    //       };

    //       socket.on("leave-document", handleLeave);
    //       socket.on("disconnect", handleLeave);
    //     } catch (error) {
    //       console.error("Error in join-document:", error);
    //     }
    //   }
    // );

    // Handle undo actions
    socket.on("undo-action", async ({ documentId, userId, state }) => {
      try {
        const document = await DocumentsModel.findOne({
          documentID: documentId,
        });
        if (!document) return;

        // Broadcast undo to all other clients in the room with the YJS state
        socket.to(documentId).emit("remote-undo", {
          userId,
          state,
        });

        // Save the state to the document
        await DocumentsModel.findOneAndUpdate(
          { documentID: documentId },
          {
            $push: {
              versions: {
                content: state, // Store YJS state
                updatedAt: new Date(),
                updatedBy: new Types.ObjectId(userId),
                versionNumber: document.versions.length + 1,
              },
            },
            $set: {
              "metadata.lastModified": new Date(),
              "metadata.lastModifiedBy": new Types.ObjectId(userId),
            },
          }
        );
      } catch (error) {
        console.error("Error handling undo:", error);
      }
    });

    // // Handle undo actions
    // socket.on("undo-action", async ({ documentId, userId }) => {
    //   try {
    //     // Get the document
    //     const document = await DocumentsModel.findOne({
    //       documentID: documentId,
    //     });
    //     if (!document) return;

    //     // Get the last version
    //     const lastVersion = document.versions[document.versions.length - 1];
    //     if (!lastVersion) return;

    //     // Broadcast undo to all other clients in the room
    //     socket.to(documentId).emit("remote-undo", {
    //       userId,
    //       versionNumber: lastVersion.versionNumber,
    //     });

    //     // Update document content to previous version
    //     await DocumentsModel.findOneAndUpdate(
    //       { documentID: documentId },
    //       {
    //         $set: {
    //           "data.content": lastVersion.content,
    //           "metadata.lastModified": new Date(),
    //           "metadata.lastModifiedBy": new Types.ObjectId(userId),
    //         },
    //       }
    //     );
    //   } catch (error) {
    //     console.error("Error handling undo:", error);
    //   }
    // });

    // Handle redo actions
    socket.on("redo-action", async ({ documentId, userId, state }) => {
      try {
        const document = await DocumentsModel.findOne({
          documentID: documentId,
        });
        if (!document) return;

        // Broadcast redo to all other clients with the YJS state
        socket.to(documentId).emit("remote-redo", {
          userId,
          state,
        });

        // Save the state
        await DocumentsModel.findOneAndUpdate(
          { documentID: documentId },
          {
            $push: {
              versions: {
                content: state,
                updatedAt: new Date(),
                updatedBy: new Types.ObjectId(userId),
                versionNumber: document.versions.length + 1,
              },
            },
            $set: {
              "metadata.lastModified": new Date(),
              "metadata.lastModifiedBy": new Types.ObjectId(userId),
            },
          }
        );
      } catch (error) {
        console.error("Error handling redo:", error);
      }
    });

    // Handle cursor updates
    socket.on(
      "cursor-update",
      async ({ documentId, userId, userName, range, color }) => {
        console.log("cursor-update", {
          documentId,
          userId,
          userName,
          range,
          color,
        });
        try {
          // Broadcast to other users in the room
          socket.to(documentId).emit("cursor-update", {
            userId,
            userName,
            range,
            color,
          });

          // Update cursor position in database
          await DocumentsModel.findOneAndUpdate(
            {
              documentID: documentId,
              "activeUsers.userID": new Types.ObjectId(userId),
            },
            {
              $set: {
                "activeUsers.$.lastActive": new Date(),
                "activeUsers.$.cursor": range,
                "activeUsers.$.color": color,
                "activeUsers.$.selection.$.ranges": range,
              },
            }
          );
        } catch (error) {
          console.error("Error updating cursor:", error);
        }
      }
    );

    // Handle redo actions
    // socket.on("redo-action", async ({ documentId, userId }) => {
    //   try {
    //     // Get the document
    //     const document = await DocumentsModel.findOne({
    //       documentID: documentId,
    //     });
    //     if (!document) return;

    //     // Broadcast redo to all other clients
    //     socket.to(documentId).emit("remote-redo", {
    //       userId,
    //       content: document.data.content,
    //     });
    //   } catch (error) {
    //     console.error("Error handling redo:", error);
    //   }
    // });

    // refactor this
    await UserRegistryManager.register(userID, socketID);

    socket.on("disconnecting", () => {
      (async () => {
        console.log("disconnected");
        await UserRegistryManager.pop(userID, socketID);
      })();
      // unhandled promise rejections
    });
  }

  static messageHandler(socket: Socket) {
    return function (msg: string) {
      // const res =
        parseSocketMessage(msg);
      // if (!res) {
      //   console.log("correct message was sent", msg);
      // } else {
      console.log("invalid message received", msg);
      // }
    };
  }
}




// socket.on('join-document', async ({ documentId, userId, userName, color }) => {
//   try {
//     socket.join(documentId);

//     // Update document's active users
//     await DocumentsModel.findOneAndUpdate(
//       { documentID: documentId },
//       {
//         $pull: { // First remove any existing entry for this user
//           activeUsers: { 
//             'userID': new Types.ObjectId(userId) 
//           }
//         }
//       }
//     );

//     // Add the user with new presence data
//     await DocumentsModel.findOneAndUpdate(
//       { documentID: documentId },
//       {
//         $push: {
//           activeUsers: {
//             userID: new Types.ObjectId(userId),
//             lastActive: new Date(),
//             cursor: null,
//             selection: null,
//             color: color,
//             userName: userName
//           }
//         }
//       }
//     );

//     // Get and broadcast updated active users
//     const document = await DocumentsModel.findOne({ documentID: documentId });
//     if (document) {
//       io.to(documentId).emit('active-users', document.activeUsers);
//     }

//     // Handle cursor updates
//     socket.on('cursor-update', async ({ range }) => {
//       await DocumentsModel.findOneAndUpdate(
//         { 
//           documentID: documentId,
//           'activeUsers.userID': new Types.ObjectId(userId)
//         },
//         {
//           $set: {
//             'activeUsers.$.lastActive': new Date(),
//             'activeUsers.$.cursor': range
//           }
//         }
//       );
//     });

//     // Handle disconnection and document leave
//     const handleLeave = async () => {
//       try {
//         // Remove user from active users
//         await DocumentsModel.findOneAndUpdate(
//           { documentID: documentId },
//           {
//             $pull: {
//               activeUsers: { 
//                 'userID': new Types.ObjectId(userId) 
//               }
//             }
//           }
//         );

//         // Get and broadcast updated active users
//         const document = await DocumentsModel.findOne({ documentID: documentId });
//         if (document) {
//           io.to(documentId).emit('active-users', document.activeUsers);
//         }

//         socket.leave(documentId);
//       } catch (error) {
//         console.error('Error handling user leave:', error);
//       }
//     };

//     socket.on('leave-document', handleLeave);
//     socket.on('disconnect', handleLeave);

//   } catch (error) {
//     console.error('Error in join-document:', error);
//   }
// });

// Periodic cleanup of stale active users (optional)
setInterval(async () => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    await DocumentsModel.updateMany(
      {},
      {
        $pull: {
          activeUsers: {
            lastActive: { $lt: fiveMinutesAgo }
          }
        }
      }
    );
  } catch (error) {
    console.error('Error cleaning up stale users:', error);
  }
}, 5 * 60 * 1000); // Run every 5 minutes

function parseSocketMessage(msg: string) {
  throw new Error("Function not implemented.");
}


// Helper function for generating consistent colors
function getRandomColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
}
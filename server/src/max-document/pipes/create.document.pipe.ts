import httpStatus from "http-status";
import { DocumentsModel, UserModel } from "../../max-entities";
import { CreateDocumentDTO } from "../DTOs/CreateDocumentDTO";
import { getRandomColor } from "../../max-shared";
import { v4 as uuidv4 } from "uuid";

export const CreateDocumentPipe = async (
  CreateDocumentDTO: CreateDocumentDTO
) => {
  const { userID, name } = CreateDocumentDTO;
  const user = await UserModel.findById(userID);
  if (!user)
    return {
      success: false,
      status: httpStatus.NOT_FOUND,
      message: `Account not found`,
      data: null,
      hookData: null,
    };

  const document = await DocumentsModel.create({
    userID,
    documentID: uuidv4(),
    name,
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
        color: getRandomColor(userID.toString()),
        lastActive: new Date(),
      },
    ],
  });
  return {
    success: true,
    status: httpStatus.CREATED,
    message: `Document created successfully`,
    data: document,
    hookData: document,
  };
};

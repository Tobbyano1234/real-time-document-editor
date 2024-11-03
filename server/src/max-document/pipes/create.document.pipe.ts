import httpStatus from "http-status";
import { DocumentsModel, UserModel } from "../../max-entities";
import { CreateDocumentDTO } from "../DTOs/CreateDocumentDTO";

export const CreateDocumentPipe = async (
  CreateDocumentDTO: CreateDocumentDTO
) => {
  const { userID, name, data } = CreateDocumentDTO;
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
    name,
    data,
  });
  return {
    success: true,
    status: httpStatus.CREATED,
    message: `Document created successfully`,
    data: document,
    hookData: document,
  };
};

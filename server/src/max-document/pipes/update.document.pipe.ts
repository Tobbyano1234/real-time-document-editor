import httpStatus from "http-status";
import { DocumentsModel } from "../../max-entities";
import { UpdateDocumentDTO } from "../DTOs/UpdateDocumentDTO";

export const UpdateDocumentPipe = async (
  UpdateDocumentDTO: UpdateDocumentDTO
) => {
  const { documentID, name, data } = UpdateDocumentDTO;
  const documentExists = await DocumentsModel.findById(documentID);
  if (!documentExists)
    return {
      success: false,
      status: httpStatus.NOT_FOUND,
      message: `Document not found`,
      data: null,
      hookData: null,
    };
  const document = await DocumentsModel.findByIdAndUpdate(
    documentID,
    { name, data },
    { new: true }
  );
  return {
    success: true,
    status: httpStatus.OK,
    message: `Document updated successfully`,
    data: document,
    hookData: document,
  };
};

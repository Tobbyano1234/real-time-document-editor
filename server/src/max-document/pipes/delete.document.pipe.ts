import httpStatus from "http-status";
import { DocumentsModel } from "../../max-entities";
import { DeleteDocumentDTO } from "../DTOs/DeleteDocumentDTO";

export const DeleteDocumentPipe = async (
  DeleteDocumentDTO: DeleteDocumentDTO
) => {
  const { documentID } = DeleteDocumentDTO;
  const document = await DocumentsModel.findByIdAndDelete(documentID);
  if (!document)
    return {
      success: false,
      status: httpStatus.NOT_FOUND,
      message: `Document not found`,
      data: null,
      hookData: null,
    };
  return {
    success: true,
    status: httpStatus.OK,
    message: `Document deleted successfully`,
    data: null,
    hookData: null,
  };
};

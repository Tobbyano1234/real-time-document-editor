import { PipelineStage } from "mongoose";
import { DocumentsModel } from "../../max-entities";
import {
  GetAllDocumentsDTO,
  GetSingleDocumentDTO,
} from "../DTOs/GetDocumentDTO";
import httpStatus from "http-status";

export const GetSingleDocumentPipe = async (
  GetSingleDocumentDTO: GetSingleDocumentDTO
) => {
  const { documentID } = GetSingleDocumentDTO;
  const document = await DocumentsModel.findById(documentID);
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
    message: `Document fetched successfully`,
    data: document,
    hookData: document,
  };
};

export const GetAllDocumentsPipe = async (
  GetAllDocumentsDTO: GetAllDocumentsDTO
) => {
  const { userID, search } = GetAllDocumentsDTO;
  const aggregationPipeline: PipelineStage[] = [{ $match: { "author.userID": userID } }];
  if (search) {
    aggregationPipeline.push({ $match: { name: { $regex: search, $options: "i" } } });
  }
  const documents = await DocumentsModel.aggregate(
    aggregationPipeline as unknown as PipelineStage[]
  );
  if (documents.length === 0)
    return {
      success: true,
      status: httpStatus.OK,
      message: `No document yet`,
      data: documents,
      hookData: documents,
    };
  return {
    success: true,
    status: httpStatus.OK,
    message: `Documents fetched successfully`,
    data: documents,
    hookData: documents,
  };
};

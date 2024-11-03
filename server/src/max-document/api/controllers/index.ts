import { Request } from "express";

import { BaseController } from "../../../max-shared/api";
import { toObjectId } from "../../../max-shared/validateToObjectID";
import { CreateDocumentDTO } from "../../DTOs/CreateDocumentDTO";
import { GetAllDocumentsDTO } from "../../DTOs/GetDocumentDTO";
import { DocumentModule } from "../../modules";
import { UpdateDocumentDTO } from "../../DTOs/UpdateDocumentDTO";

export class DocumentController {
  static createDocument = BaseController(async (request: Request) => {
    const CreateDocumentDTO = request.body as CreateDocumentDTO;
    CreateDocumentDTO.userID = toObjectId(request.token._id);
    const { status, message, data } = (await DocumentModule({
      DTO: ["basic", CreateDocumentDTO],
      onSuccess: () => {},
    }))!;
    return {
      status,
      message,
      data,
    };
  });

  static updateDocument = BaseController(async (request: Request) => {
    const UpdateDocumentDTO = request.body as UpdateDocumentDTO;
    UpdateDocumentDTO.documentID = toObjectId(request.params.documentID);
    const { status, message, data } = (await DocumentModule({
      DTO: ["update", UpdateDocumentDTO],
      onSuccess: () => {},
    }))!;
    return {
      status,
      message,
      data,
    };
  });

  static deleteDocument = BaseController(async (request: Request) => {
    const documentID = toObjectId(request.params.documentID);
    const { status, message, data } = (await DocumentModule({
      DTO: ["delete", { documentID }],
      onSuccess: () => {},
    }))!;
    return {
      status,
      message,
      data,
    };
  });

  static getSingleDocument = BaseController(async (request: Request) => {
    const documentID = toObjectId(request.params.documentID);
    const { status, message, data } = (await DocumentModule({
      DTO: ["single", { documentID }],
      onSuccess: () => {},
    }))!;
    return {
      status,
      message,
      data,
    };
  });

  static getAllDocuments = BaseController(async (request: Request) => {
    const GetAllDocuments = {} as GetAllDocumentsDTO;
    GetAllDocuments.userID = toObjectId(request.token._id);
    GetAllDocuments.page = Number(request.query.page) || 1;
    GetAllDocuments.limit = Number(request.query.limit) || 10;
    GetAllDocuments.search = request.query.search as string;
    const { status, message, data } = (await DocumentModule({
      DTO: ["all", GetAllDocuments],
      onSuccess: () => {},
    }))!;
    return {
      status,
      message,
      data,
    };
  });
}

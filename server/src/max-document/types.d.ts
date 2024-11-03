import { CreateDocumentDTO } from "./DTOs/CreateDocumentDTO";
import { DeleteDocumentDTO } from "./DTOs/DeleteDocumentDTO";
import { GetAllDocumentsDTO, GetSingleDocumentDTO } from "./DTOs/GetDocumentDTO";
import { UpdateDocumentDTO } from "./DTOs/UpdateDocumentDTO";

export type Documents = {
  DTO:
    | ["basic", CreateDocumentDTO]
    | ["update", UpdateDocumentDTO]
    | ["delete", DeleteDocumentDTO]
    | ["single", GetSingleDocumentDTO]
    | ["all", GetAllDocumentsDTO];
  onSuccess: (...args: any[]) => any;
};

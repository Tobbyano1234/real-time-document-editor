import { ObjectId } from "mongodb";

export type GetSingleDocumentDTO = {
  documentID: ObjectId;
};

export type GetAllDocumentsDTO = {
  userID: ObjectId;
  page: number;
  limit: number;
  search?: string;
};

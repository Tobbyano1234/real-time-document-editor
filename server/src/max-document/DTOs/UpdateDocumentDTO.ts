import { ObjectId } from "mongodb";

export type UpdateDocumentDTO = {
  documentID: ObjectId;
  name: string;
  data: {
    [key: string]: any;
  };
};

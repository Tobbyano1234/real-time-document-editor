import { ObjectId } from "mongodb";

export type CreateDocumentDTO = {
  userID: ObjectId;
  name: string;
  data: {
    [key: string]: any;
  };
};

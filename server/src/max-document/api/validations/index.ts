import { Joi } from "celebrate";
import { toObjectId } from "../../../max-shared/validateToObjectID";

export default {
  createDocument: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().max(500),
      departmentHead: Joi.string().custom(toObjectId),
      teams: Joi.array().items(Joi.string().custom(toObjectId)),
    }),
  },
  getSingleDocument: {
    params: {
      documentID: Joi.string().custom(toObjectId).required(),
    },
  },
  deleteDocument: {
    params: {
      documentID: Joi.string().custom(toObjectId).required(),
    },
  },
  updateDocument: {
    params: {
      documentID: Joi.string().custom(toObjectId).required(),
    },
    body: Joi.object({
      name: Joi.string().min(3).max(225),
      data: Joi.object(),
    }),
  },
  getAllDocuments: {
    query: Joi.object({
      page: Joi.number().min(1),
      limit: Joi.number().min(1),
      search: Joi.string().max(225),
    }),
  },
};

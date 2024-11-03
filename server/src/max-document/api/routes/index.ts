import { DocumentController } from "../controllers";
import { baseRouter, baseValidation } from "../../../max-shared/api";
import { AuthMiddleware } from "../../../max-auth/middlewares";
import DocumentValidation from "../validations/index";

const { POST, PUT, GET, DELETE, router } = baseRouter();

POST("/", [
  baseValidation(DocumentValidation.createDocument),
  AuthMiddleware.baseAuthToken,
  AuthMiddleware.IsUserMiddleware,
  DocumentController.createDocument,
]);
PUT("/:documentID", [
  baseValidation(DocumentValidation.updateDocument),
  AuthMiddleware.baseAuthToken,
  AuthMiddleware.IsUserMiddleware,
  DocumentController.updateDocument,
]);

DELETE("/:documentID", [
  baseValidation(DocumentValidation.deleteDocument),
  AuthMiddleware.baseAuthToken,
  AuthMiddleware.IsUserMiddleware,
  DocumentController.deleteDocument,
]);

GET("/:documentID", [
  baseValidation(DocumentValidation.getSingleDocument),
  AuthMiddleware.baseAuthToken,
  AuthMiddleware.IsUserMiddleware,
  DocumentController.getSingleDocument,
]);

GET("/", [
  AuthMiddleware.baseAuthToken,
  AuthMiddleware.IsUserMiddleware,
  DocumentController.getAllDocuments,
]);

export default router;

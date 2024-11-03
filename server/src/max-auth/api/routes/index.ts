import { baseRouter, baseValidation } from "../../../max-shared/api";
import { AuthController } from "../controllers";
import authValidation from "../validations";

const { POST, router } = baseRouter();

POST("/signup-user", [
  baseValidation(authValidation.signupUser),
  AuthController.signUpUser,
]);
POST("/signin-user", [
  baseValidation(authValidation.signinUser),
  AuthController.signInUser,
]);    

export default router;

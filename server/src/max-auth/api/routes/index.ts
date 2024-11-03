import { AuthMiddleware } from "../../middlewares";
import { baseRouter, baseValidation } from "../../../max-shared/api";
import { AuthController } from "../controllers";
import authValidation from "../validations";

const { POST, router } = baseRouter();

POST("/google-auth-code", [
  baseValidation(authValidation.googleAuthCode),
  AuthController.googleAuthCode,
]);

POST("/signup-user", [
  baseValidation(authValidation.signupUser),
  AuthController.signUpUser,
]);
POST("/signin-user", [
  baseValidation(authValidation.signinUser),
  AuthController.signInUser,
]);       
POST("/send-otp-user", [
  baseValidation(authValidation.sendOtpUser),
  AuthController.sendUserOTP,
]);

POST("/verify-otp-user", [
  baseValidation(authValidation.verifyOtpUser),
  /*forgotPasswordRateLimiter,*/ AuthController.verifyUserOTP,
]);


POST("/verify-password-user", [
  baseValidation(authValidation.verifyPasswordUser),
  AuthController.verifyUserPassword,
]);


POST("/change-password-user", [
  /*changePasswordRateLimiter,*/ baseValidation(
    authValidation.changePasswordUser
  ),
  AuthMiddleware.baseAuthToken,
  AuthMiddleware.IsUserMiddleware,
  AuthController.changeUserPassword,
]);

POST("/reset-password-user", [
  /*changePasswordRateLimiter,*/ baseValidation(
    authValidation.resetPasswordUser
  ),
  AuthController.resetUserPassword,
]);

export default router;

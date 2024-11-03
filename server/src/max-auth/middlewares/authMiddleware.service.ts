import { accessControl } from "./accessControl.service";
import { authTokenService } from "./authToken.service";
import { headerBearerToken } from "./policies.service";
import { AccountTokenType, AccountType } from "../../typings/Account.types";

export class AuthMiddleware {
  static IsUser = (token?: AccountTokenType) =>
    accessControl({ AccountTypes: [AccountType.USER], token });
  static IsUserMiddleware = AuthMiddleware.IsUser();

  static baseAuthToken = authTokenService({
    authPolicy: headerBearerToken,
    allowExternalAccess: false,
  });

  static baseAuthTokenForUserWithExternalAccess = authTokenService({
    authPolicy: headerBearerToken,
    allowExternalAccess: true,
    roleAccess: AuthMiddleware.IsUser,
  });

  static accountHolderAccess = authTokenService({
    authPolicy: headerBearerToken,
    allowExternalAccess: false,
    roleAccess: AuthMiddleware.IsUser,
  });
}

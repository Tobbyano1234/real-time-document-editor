import { Request } from "express";

import { AccountTokenType } from "../Account.types";

declare global {
  export namespace Express {
    interface Request {
      token: AccountTokenType;
    }
  };
}

export interface AuthenticatedRequest extends Request {
  token: AccountTokenType;
}


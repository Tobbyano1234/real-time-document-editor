import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { sendResponse } from "../../max-shared/response";
import {
  GeneralModel,
  UserModel,
} from "../../max-entities";
import {
  AccountType,
  AccountTokenType,
  AccountStatus,
  AccountMetaDataGeneral,
} from "../../typings/Account.types";

type AccountTypes = AccountType[];
type AccessControlType = {
  AccountTypes: AccountTypes;
  token?: AccountTokenType;
};
export const accessControl = ({
  AccountTypes,
  token,
}: AccessControlType) => {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const AccountToken =
      token || (request as Request & { token: AccountTokenType }).token;

    const { accountType, _id } = AccountToken;
    const accessGranted = AccountTypes.some(
      (_accountType) => _accountType === accountType
    );
    if (!accessGranted) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json(
          sendResponse(
            httpStatus.FORBIDDEN,
            "You are not Authorized to perform this operation!",
            null,
            { error: "Invalid credentials" }
          )
        );
    }

    try {
      if (accountType == AccountType.USER) {
        const account = await UserModel.findById(_id);
        if (!account)
          return response
            .status(httpStatus.UNAUTHORIZED)
            .json(
              sendResponse(
                httpStatus.UNAUTHORIZED,
                `cannot proceed with authentication`,
                null,
                { error: `cannot proceed with authentication` }
              )
            );
      } else {
        const account = (await GeneralModel.findOne({
          collectionID: new Types.ObjectId(_id),
          collectionName: accountType,
          "associatedData.type": "metaData",
        })) as AccountMetaDataGeneral;
        if (!account) {
          return response.status(httpStatus.UNAUTHORIZED).json(
            sendResponse(
              httpStatus.UNAUTHORIZED,
              `cannot proceed with authentication`,
              null,
              {
                error: "cannot proceed with authentication",
              }
            )
          );
        }
        const suspendedAccount =
          account.associatedData.metaData.status == AccountStatus.SUSPENDED;
        if (suspendedAccount) {
          return response.status(httpStatus.UNAUTHORIZED).json(
            sendResponse(
              httpStatus.UNAUTHORIZED,
              `${accountType} account suspended`,
              null,
              {
                error: "User account suspended",
              }
            )
          );
        }
        const deactivatedAccount =
          account.associatedData.metaData.status == AccountStatus.DEACTIVATED;
        if (deactivatedAccount) {
          // either login before x days or create another account
          return response.status(httpStatus.UNAUTHORIZED).json(
            sendResponse(
              httpStatus.UNAUTHORIZED,
              `${accountType} account deactivated`,
              null,
              {
                error: "user account deactivated",
              }
            )
          );
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }

    return next();
  };
};
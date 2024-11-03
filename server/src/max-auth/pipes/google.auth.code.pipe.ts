import { match } from "ts-pattern";
import { OAuth2Client, TokenPayload } from "google-auth-library";

import { GoogleAuthCodeDTO } from "../DTOs/signIn.DTO";
import { config } from "../../max-web-api/config";
import { GoogleSignInSuccessHook, GoogleSignUpSuccessHook } from "../hooks";
import { AccountStatus, AccountType } from "../../typings/Account.types";
import { UserModel, User } from "../../max-entities";
import { issueToken } from "../plugins";
import { ReturnValue } from "../types";
import { getUserService } from "../../max-accounts/user/services";

export const GoogleAuthCodePipe = async (
  GoogleAuthCodeDTO: GoogleAuthCodeDTO
) => {
  const { code, context } = GoogleAuthCodeDTO;
  const client = new OAuth2Client(
    "101210121012-121212121212121212121.apps.googleusercontent.com",
    // config.credentials.googleOauth.clientID,
    config.credentials.googleOauth.clientSecret,
    "postmessage"
  );
  const { tokens } = await client.getToken(code); // exchange code for tokens
  const googleToken = await client.verifyIdToken({
    idToken: tokens.id_token!,
    // audience: config.credentials.googleOauth.clientID,
  });
  const tokenPayload = googleToken.getPayload();
  if (!tokenPayload)
    return {
      success: false,
      message: `Cannot confirm user details`,
      data: null,
      hookData: null,
    };

  const { email, email_verified, sub, picture, given_name, family_name } =
    tokenPayload as Required<TokenPayload>;

  const result = await match(context)
    .with("user", async () => {
      let user = (await UserModel.findOne({
        $or: [{ googleSocialID: sub }, { email }],
      })
        .populate("userID", "userType")
        .select({
          password: 0,
          twoFactorSecret: 0,
          backUp2FACodes: 0,
        })) as User;
      if (user) {
        if (user.status == AccountStatus.SUSPENDED)
          return {
            success: false,
            message: `Individual currently suspended`,
            data: null,
            hookData: null,
          };

        // sign in
        const token = await issueToken({
          accountType: AccountType.USER,
          _id: user._id,
          issuedAt: Date.now(),
          email,
        });
        process.nextTick(() => {
          GoogleSignUpSuccessHook({
            ...(user as any)._doc,
            context: "user",
          });
        });
        return {
          success: true,
          message: "Individual signed in successfully",
          data: user,
          hookData: user,
          token,
        };
      } else {
        // sign up
        const data = await UserModel.create({
          firstName: given_name,
          lastName: family_name,
          isVerified: !!email_verified,
          fullName: `${given_name} ${family_name}`,
          email,
          googleSocialID: sub,
          avatar: picture,
        });

        const token = await issueToken({
          accountType: AccountType.USER,
          _id: data._id,
          issuedAt: Date.now(),
          email,
        });
        process.nextTick(() => {
          GoogleSignInSuccessHook({
            ...(data as any)._doc,
            googleSocialID: sub,
          });
        });
        return {
          success: true,
          message: "New account created",
          data: { ...(data as any)._doc, isNewUser: true },
          hookData: data,
          token,
        };
      }
    })
    .otherwise(async () => {
      const user = await getUserService(
        { email },
        { onUserNotFound: () => {} }
      );
      if (!user)
        return {
          success: false,
          message: `Account not found. Kindly sign up`,
          data: {},
          hookData: {},
        };

      const result = await match("user")
        .with("user", async () => {
          const user = (await UserModel.findOne({
            $or: [{ email }],
          })
            .populate("userID", "userType")
            .select({
              password: 0,
              twoFactorSecret: 0,
              backUp2FACodes: 0,
            })) as User;

          if (user?.status == AccountStatus.SUSPENDED)
            return {
              success: false,
              message: `individual currently suspended`,
              data: null,
              hookData: null,
            };
          const token = await issueToken({
            accountType: AccountType.USER,
            _id: user?._id,
            issuedAt: Date.now(),
            email,
          });
          process.nextTick(() => {
            GoogleSignInSuccessHook({
              ...(user as any)._doc,
              context: "user",
            });
          });
          return {
            success: true,
            message: "user signed in successfully",
            data: user,
            hookData: user,
            token,
          };
        })
        .otherwise(() => {
          return {
            success: false,
            message: `Something went wrong`,
            data: {},
            hookData: {},
          };
        });
      const { success, message, data, hookData, token } = result as ReturnValue;
      return { success, message, data, hookData, token };
    });

  const { success, message, data, hookData, token } = result as ReturnValue;
  return { success, message, data, hookData, token };
};

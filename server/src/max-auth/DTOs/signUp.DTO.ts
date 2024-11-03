import { GoogleUserProfile } from "../../typings/Google.Profile.User.types";


export class LocalSignUpUserDTO {
  name: string;
  email: string;
  password: string;
}

export type GoogleSignUpDTO = Pick<
  GoogleUserProfile,
  | "family_name"
  | "given_name"
  | "displayName"
  | "email"
  | "email_verified"
  | "id"
  | "picture"
> & { context: string };

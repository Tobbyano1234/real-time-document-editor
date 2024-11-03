import { GoogleUserProfile } from "../../typings/Google.Profile.User.types";

export class LocalSignInDTO {
  email: string;
  password: string;
};



export type GoogleSignInDTO = Pick<GoogleUserProfile, 'family_name' | 'given_name' | 'displayName' | 'email' | 'email_verified' | 'id' | 'picture'> & {context: string};
export type GoogleAuthDTO = {
  idToken?: string;
  context: string;
  code: string;
};
export type GoogleAuthCodeDTO = {
  code: string;
  context: string;
};
export class FacebookSignInDTO {}
export class TwitterSignInDTO {}

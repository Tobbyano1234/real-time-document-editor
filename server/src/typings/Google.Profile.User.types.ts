
type language = "en" | "fr";

export type GoogleUserProfile = {
  provider: 'google',
  sub: string,
  id: string,
  displayName?: string,
  name: { givenName: string, familyName: string },
  given_name: string,
  family_name: string,
  email_verified: boolean,
  verified: boolean,
  language: language,
  locale: undefined,
  email: string,
  emails: [],
  photos: [],
  picture: string, 
  _raw: string,
  _json: object,
};

import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import crypto from 'crypto';

import { AccountTokenType } from '../../typings/Account.types';
import { config } from '../../max-web-api/config';


// ECDSA verification options
const verificationOptions: VerifyOptions = {
  // algorithms: ['ES256'], // Specify the allowed algorithm(s) for verification
};

export const issueToken = (payload: AccountTokenType,): Promise<string> => {
  // ECDSA signing options
  const signingOptions: SignOptions = {
    expiresIn: config.credentials.jwt.expirationInterval,
  };
  return new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      config.credentials.jwt.secret,
      signingOptions,
      (error, decoded) => {
        if (error) return reject(error);
        // match decoded parameter argument conflict
        return resolve(decoded as string | Promise<string>);
      },
    ),
  );
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.credentials.jwt.secret, verificationOptions, (error: any, decoded: any) => {
      if (error) return reject(error);
      return resolve(decoded);
    }),
  );
};


export const verifyTokenSync = (token: string) => {
  let err = null as unknown as { name: string; message: string };
  let res = null as unknown as AccountTokenType;
  jwt.verify(token, config.credentials.jwt.secret, (error, decoded) => {
    if (error) {
      const _err = {
        name: error.name,
        message: error.message
      }
      err = _err;
    }
    res = decoded as AccountTokenType;
  });
  return { err, res };
};

export const generateInviteToken = (): string => {
  return crypto.randomBytes(20).toString('hex');
};

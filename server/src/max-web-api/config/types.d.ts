export type ConfigTypes = {
  env: string;
  port: number;
  apiDocs: string;
  apiDocs: string;
  apiDocsBackOffice: string;
  generatorFrontendAppUrl: string;
  collectorFrontendAppUrl: string;
  transporterFrontendAppUrl: string;
  adminFrontendAppUrl: string;
  store: {
    database: {
      mongodb: IMongodb;
      postgres: IPostgres;
    };
  };
  client: {
    mediaClient: {
      aws: {
        S3: IAwsS3;
        cloudFront: IAwsCloudFront;
      }
    };
    mailClient: {
      sendgrid: ISendgrid;
      mailgun: IMailgun;
    };
    paymentClient: {
      flutterwave: IFlutterwave;
      paystack: IPaystack;
      stripe: IStripe;
      okra: IOkra;
      squad: ISquad;
      flick: IFlick;
    };
  };
  credentials: {
    crypto: ICrypto;
    jwt: IJWT;
    googleOauth: IGoogleOauth;
    facebookOauth: IGoogleOauth;
    googleSpreadsheet: {
      spreadsheetID: string;
    };
    algolia: {
      applicationID: string;
      adminApiKey: string;
    };
    session: ISession;
    token: {
      serverPublicToken: string
    },
    microsoft: IMicrosoft;
  };
  defaults: {
    daysToEffectAccountDeactivation: number;
    maxItemsInGiftExchangeWishlist: number;
    generalServerTaskDuration: number;
    giftCostPercentageAddition: number;
    mailInfo: IMail;
    rateLimiter: IRateLimiter;
    saltWorker: number;
  };
};

interface ICrypto {
  key: string;
  algorithm: string;
};

interface IFlick {
  api: string;
  secretKey: string;
}

interface IAwsS3 {
  accessKeyID: string;
  secretAccessKey: string;
  bucketRegion: string;
  bucketNameGeneratorImage: string;
  bucketNameGeneratorDocument: string;
  bucketNameCollectorImage: string;
  bucketNameCollectorDocument: string;
  bucketNameProductImage: string;
};

interface IAwsCloudFront {
  generatorImageUrl: string;
  generatorDocumentUrl: string;
  collectorImageUrl: string;
  collectorDocumentUrl: string;
  productImageUrl: string;
};

interface IMicrosoft {
  api: string;
  appId: string;
  clientSecret: string;
  clientSecretId: string;
  tenantId: string;
}

interface IOkra {
  api: string;
  secretKey: string;
};
interface ISquad {
  api: string;
  secretKey: string
};

interface IAws {
  avatarBucketName: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

interface ISession {
  secret: string;
  cookieOptions?: any | undefined; // TODO add type for this option. It is not documented
}
interface IPostgres {
  secureHost: string;
}

interface IPaystack {
  api: string;
  secretKey: string;
}

interface IRedis {
  password: string;
  secureHost: string;
  port: number;
}

interface IRateLimiter {
  duration: number;
  points: number;
}

interface IJWT {
  secret: string;
  expirationInterval: string;
}

interface IGoogleOauth {
  appID: string;
  clientSecret: string;
  redirectURL: string;
}

interface IFacebookOauth {
  appID: string;
  clientSecret: string;
  redirectURL: string;
}

interface IMongodb {
  mongooseDebug: boolean;
  uri: string;
  // developmentUri: string;
  stagingUri: string;
  secureHost: string;
  testUri: string;
}

interface ICloudinary {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

interface IMail {
  motexMail: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  other: string;
}

interface ISendgrid {
  key: string;
}

interface IMailgun {
  key: string;
  domain: string;
}

interface IRedis {
  url: string;
}

interface IFlutterwave {
  api: string;
  secretKey: string;
}

interface IStripe extends Omit<IFlutterwave, "api"> {
  webhookEndpointSecret: string;
}

export interface ErrorResponseInterface {
  message: string;
  errors: string;
  stack: string | undefined;
  statusCode: number;
  payload?: object | null;
}

export interface ExpressErrorInterface extends Error {
  errors: string;
  status: number;
}

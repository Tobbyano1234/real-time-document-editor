import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();


// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  apiDocs: envVariables.API_DOCS,
  apiDocsBackOffice: envVariables.API_DOCS_BACKOFFICE,
  generatorFrontendAppUrl: envVariables.GENERATOR_FRONTEND_APP_URL,
  collectorFrontendAppUrl: envVariables.COLLECTOR_FRONTEND_APP_URL,
  transporterFrontendAppUrl: envVariables.TRANSPORTER_FRONTEND_APP_URL,
  adminFrontendAppUrl: envVariables.ADMIN_FRONTEND_APP_URL,
  store: {
    database: {
      mongodb: {
        mongooseDebug: envVariables.MONGOOSE_DEBUG,
        uri: envVariables.MONGO_HOST,
        stagingUri: envVariables.MONGO_STAGING_HOST,
        secureHost: envVariables.MONGO_SECURE_HOST,
        testUri: envVariables.MONGO_HOST_TEST,
      },
      postgres: {
        secureHost: envVariables.POSTGRES_SESSION_DB_URL,
      },
    },
    // aws: {
    //   region: envVariables.AWS_S3_BUCKET_REGION,
    //   avatarBucketName: envVariables.AWS_S3_BUCKET_NAME_AVATAR,
    //   accessKeyId: envVariables.AWS_S3_ACCESS_KEY_ID,
    //   secretAccessKey: envVariables.AWS_S3_SECRET_ACCESS_KEY
    // }
    // kvstore: {
    //   redis: {
    //     url: envVariables.REDIS_URL,
    //   }
    // },
  },
  client: {
    mediaClient: {
      aws: {
        S3: {
          accessKeyID: envVariables.AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: envVariables.AWS_S3_SECRET_ACCESS_KEY,
          bucketRegion: envVariables.AWS_S3_BUCKET_REGION,
          bucketNameGeneratorImage: envVariables.AWS_S3_BUCKET_NAME_GENERATOR_IMAGE,
          bucketNameGeneratorDocument: envVariables.AWS_S3_BUCKET_NAME_GENERATOR_DOCUMENT,
          bucketNameCollectorImage: envVariables.AWS_S3_BUCKET_NAME_COLLECTOR_IMAGE,
          bucketNameCollectorDocument: envVariables.AWS_S3_BUCKET_NAME_COLLECTOR_DOCUMENT,
          bucketNameProductImage: envVariables.AWS_S3_BUCKET_NAME_PRODUCT_IMAGE,
        },
        cloudFront: {
          generatorImageUrl: envVariables.AWS_GENERATOR_IMAGE_CLOUDFRONT,
          generatorDocumentUrl: envVariables.AWS_GENERATOR_DOCUMENT_CLOUDFRONT,
          collectorImageUrl: envVariables.AWS_COLLECTOR_IMAGE_CLOUDFRONT,
          collectorDocumentUrl: envVariables.AWS_COLLECTOR_DOCUMENT_CLOUDFRONT,
          productImageUrl: envVariables.AWS_PRODUCT_IMAGE_CLOUDFRONT,
        },
      },
    },
    mailClient: {
      sendgrid: {
        key: envVariables.SENDGRID_API_KEY,
      },
      mailgun: {
        key: envVariables.MAILGUN_DOMAIN,
        domain: envVariables.MAILDATAMAILGUN_API_KEY,
      },
    },
    paymentClient: {
      flick: {
        api: envVariables.FLICK_API,
        secretKey: envVariables.FLICK_LIVE_SECRET_KEY
      },
      flutterwave: {
        api: envVariables.FLUTTERWAVE_API,
        secretKey: envVariables.FLUTTERWAVE_SECRET_KEY,
      },
      paystack: {
        api: envVariables.PAYSTACK_API,
        secretKey: envVariables.PAYSTACK_LIVE_SECRET_KEY,
      },
      squad: {
        api: envVariables.SQUAD_API,
        secretKey: envVariables.SQUAD_SECRET_KEY,
      },
      stripe: {
        secretKey: envVariables.STRIPE_SECRET_KEY,
        webhookEndpointSecret: envVariables.STRIPE_WEBHOOK_ENDPOINT_SECRET,
      },
      okra: {
        api: envVariables.OKRA_API,
        secretKey: envVariables.OKRA_SECRET_KEY,
      },
    },
  },
  credentials: {
    crypto: {
      key: envVariables.CRYPTO_KEY,
      algorithm: envVariables.CRYPTO_ALGORITHM,
    },
    jwt: {
      secret: envVariables.JWT_SECRET,
      expirationInterval: envVariables.JWT_EXPIRY,
    },
    googleOauth: {
      appID: envVariables.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: envVariables.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectURL: envVariables.GOOGLE_OAUTH_REDIRECT_URL,
    },
    facebookOauth: {
      appID: envVariables.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: envVariables.FACEBOOK_OAUTH_CLIENT_SECRET,
      redirectURL: envVariables.FACEBOOK_OAUTH_REDIRECT_URL,
    },
    googleSpreadsheet: {
      spreadsheetID: envVariables.GOOGLE_SPREADSHEET_ID,
    },
    algolia: {
      applicationID: envVariables.ALGOLIA_APPLICATION_ID,
      adminApiKey: envVariables.ALGOLIA_ADMIN_API_KEY,
    },
    session: {
      secret: envVariables.SESSION_SECRET,
    },
    token: {
      serverPublicToken: envVariables.SERVER_PUBLIC_TOKEN,
    },
    microsoft: {
      api: envVariables.MICROSOFT_API,
      appId: envVariables.MICROSOFT_APP_ID,
      clientSecret: envVariables.MICROSOFT_CLIENT_SECRET,
      clientSecretId: envVariables.MICROSOFT_CLIENT_SECRET_ID,
      tenantId: envVariables.MICROSOFT_TENANT_ID,
    }
  },
  defaults: {
    daysToEffectAccountDeactivation:
      envVariables.DAYS_TO_EFFECT_ACCOUNT_DEACTIVATION,
    generalServerTaskDuration: envVariables.GENERAL_SERVER_TASK_DURATION,
    maxItemsInGiftExchangeWishlist:
      envVariables.MAX_ITEMS_IN_GIFTEXCHANGEWISHLIST,
    giftCostPercentageAddition: envVariables.GIFT_COST_PERCENTAGE_ADDITION,
    mailInfo: {
      motexMail: envVariables.MOTEX_MAIL,
      from: envVariables.MAILDATASENDER,
      to: envVariables.MAILDATARECIPIENT,
      subject: envVariables.MAILDATASUBJECT,
      text: envVariables.MAILDATAMESSAGEBODY,
      other: envVariables.MAILDATAINFO,
    },
    rateLimiter: {
      duration: envVariables.RATE_LIMIT_DURATION_SECONDS,
      points: envVariables.RATE_LIMIT_PERMISSION_POINTS,
    },
    saltWorker: envVariables.SALT_WORKER,
  },
};


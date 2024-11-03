import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import compress from 'compression';
import methodOverride from 'method-override';
import mongoose from "mongoose";

import { config } from "../config";
import v1Routes from "./v1/routes";
import { error } from "../config/errors";


mongoose.set('strictQuery', false);

// express application
const app = express();

// disable for performance
app.disable('etag').disable('x-powered-by');

// secure apps by setting various HTTP headers
app.use(
    helmet({ dnsPrefetchControl: false, frameguard: false, ieNoOpen: false })
);

// compress request data for easy transport
app.use(compress());
app.use(methodOverride());

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// parse body params and attach them to res.body
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// enable detailed API logging in dev env
if (config.env === 'development') app.use(logger('dev'));

// all routes are marked as private routes within the app
app.use('/api/v1', v1Routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;

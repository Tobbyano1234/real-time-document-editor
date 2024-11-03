import { ConnectOptions } from "mongoose";

export const LiveDBConnectOptions: ConnectOptions = {
  keepAlive: true,
} as ConnectOptions;
export const MockDBConnectOptions: ConnectOptions = {};
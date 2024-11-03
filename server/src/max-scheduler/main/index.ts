import cron from "node-cron";
import httpStatus from "http-status";

import { config } from "../../max-web-api/config";


export const GeneralServerTask = async (
  cronExpression = `*/${config.defaults.generalServerTaskDuration} * * * *`
) => {
  try {
    const GeneralServerTask = cron.schedule(
      cronExpression,
      () => {
        console.log("checking")
      },
      {
        scheduled: true,
      }
    );

    return {
      status: httpStatus.OK,
      success: true,
      message: "General Server Task",
      payload: GeneralServerTask,
    };
  } catch (error: any) {
    return {
      status: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      error,
    };
  }
};

import cron from "node-cron";
import httpStatus from "http-status";

import { eventObject } from "../jobs/eventObject";
import { config } from "../../max-web-api/config";
import { minutesFromNow } from "../../max-shared/time";
import { TaskModel, TaskStatus, Task } from "../../max-entities";

export const processFunction = async () => {
  /**
   * Filter eligibleTasks
   */

  let EligibleTasks: Task[] = await TaskModel.find({
    status: TaskStatus.INCOMPLETE,
    canceledAt: { $eq: null },
    executionTime: { $lte: new Date() },
  });

  console.log(EligibleTasks, "EligibleTasks");

  if (EligibleTasks.length === 0) {
    return {
      processedTasks: 0,
      msg: "no task to process",
    };
  }

  EligibleTasks.forEach(async (task) => {
    // prevent errors
    if (eventObject[task.type]) {
      await eventObject[task.type](task);
    }
  });

  // unblock any stuck task
  const updatedTask = await TaskModel.updateMany(
    {
      status: TaskStatus.INCOMPLETE,
      "schedule.processing": true,
      "schedule.processTime": { $lte: minutesFromNow(-10) },
    },
    { "schedule.processing": false }
  );
  const { matchedCount, modifiedCount } = updatedTask;
  console.log(`${matchedCount} unblocked tasks were matched`);
  console.log(`${modifiedCount} unblocked tasks were modified`);

  return {
    processedTasks: EligibleTasks.length,
    msg: "processing tasks",
  };
};

export const GeneralServerTask = async (
  cronExpression = `*/${config.defaults.generalServerTaskDuration} * * * *`
) => {
  try {
    const GeneralServerTask = cron.schedule(
      cronExpression,
      () => {
        processFunction()
          .then((TaskObject) => {
            // TaskObject can be sent to a real-time analytics service.
            console.log(TaskObject.msg);
          })
          .catch((error: any) => {
            console.error(error);
          });
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

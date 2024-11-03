import { deactivateEvent } from "./deactivate.job";
import { Task, TaskModel, TaskType } from "../../max-entities";

const EventManager = async (
  task: Task,
  event: (task: Task) => Promise<void>
) => {
  console.log(
    `event_manager: MSG::OK -> attempting to process ${task.type} task ${task._id}`
  );
  const { _id } = task;
  let taskToBeProcessed: Task | null;
  const fetchedTask = (await TaskModel.findById(_id)) as Task;
  if (fetchedTask.schedule) {
    taskToBeProcessed = fetchedTask.schedule.processing
      ? null
      : await TaskModel.findByIdAndUpdate(_id, {
          schedule: { processing: true, processTime: new Date() },
        });
  } else {
    await TaskModel.findByIdAndUpdate(_id, {
      schedule: { processing: true, processTime: new Date() },
    });
    taskToBeProcessed = null;
    console.log(`fixing error with scheduling task ${_id}`);
  }

  if (taskToBeProcessed) {
    console.log(
      `event_manager: MSG::INITIALIZED -> ${task.type} task ${_id} triggered`
    );
    await event(task);
    const finishedTask = await TaskModel.findByIdAndUpdate(_id, {
      "schedule.processing": false,
    });
    console.log(
      `event_manager: MSG::FINALIZED -> ${task.type} task status ${finishedTask?.status}`
    );
  } else {
    console.log(
      `event_manager: ERR::UNEXPECTED -> dropped ${task.type} task ${_id}, REASON -> task state is "schedule.processing": true`
    );
    console.log(task);
  }
};

const DeactivateAccountEventManager = async (task: Task) => {
  await EventManager(task, deactivateEvent);
};

export const eventObject: {
  [key in TaskType]: (task: Task) => Promise<void>;
} = {
  // It makes sense not to try and complete failed payouts. Not just because of mails but users ought to retry themselves.
  deactivate_account: DeactivateAccountEventManager,
};

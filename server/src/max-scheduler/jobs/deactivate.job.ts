import { Task } from "../../max-entities";

export const deactivateEvent = async (task: Task) => {
  try {
    console.log(`attempting to deactivate account`);
  } catch (error: any) {
    console.error(error);
  }
};

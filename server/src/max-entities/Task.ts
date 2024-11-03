import { Document, Schema, model } from "mongoose"

import { ModelNames } from "./models.names";

export class Task extends Document {
  type: TaskType;
  executionTime: Date;
  associatedData: { [key:string]: any };
  canceledAt: Date;
  status: TaskStatus;
  executionContext: TaskExecutionContext;
  schedule: { processing: boolean, processTime: Date };
}

export enum TaskStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
  FAILED = "failed",
};

export enum TaskType {
  DEACTIVATE_ACCOUNT = "deactivate_account",
};

export enum TaskExecutionContext {
  PING = 'ping',
  CONTROLLER = 'controller',
  JOB = 'job',
}

export enum DeactivateAccountTaskCancellationReason {
  SIGN_IN = 'user_signed_in',
  ERROR_UNEXPECTED_NOT_FOUND = 'unexpected_error_general_model_not_found',
  ERROR_UNEXPECTED_LOGIC = 'unexpected_error_general_model_does_not_include_deactivate_account_array'
}

export const TaskSchema = new Schema(
  {
    type: { type: String, required: true },
    executionTime: { type: Date, required: true },
    associatedData: { type: Object, required: true },
    canceledAt: { type: Date, default: null },
    status: { 
      type: String, 
      enum: [
        TaskStatus.COMPLETE, 
        TaskStatus.INCOMPLETE,
        TaskStatus.FAILED,
      ],
      default: TaskStatus.INCOMPLETE,
    },
    executionContext: {
      type: String,
      enum: [
        TaskExecutionContext.CONTROLLER,
        TaskExecutionContext.PING,
        TaskExecutionContext.JOB,
      ]
    },
    schedule: {
      type: { 
        processing: {type: Boolean, default: false}, 
        processTime: {type: Date }
      },
      default: {
        processing: false,
        processTime: new Date()
      }
    }
  },
  { timestamps: true },
);

export const TaskModel = model<Task>(ModelNames.TASK, TaskSchema);

import { match } from "ts-pattern";

type DataResponse = {
  success: boolean;
  status?: number;
  message: string;
  data: any;
  hookData: any;
};

export const triggerSuccessFailureHooks = (
  DataResponse: DataResponse,
  onSuccess: (...args: any[]) => any,
  onFailure = (...args: any[]) => { }
) =>
  match(DataResponse)
    .with({ success: true }, ({ hookData }) => onSuccess(hookData))
    .with({ success: false }, ({ hookData }) => onFailure(hookData))
    .run();

export const triggerExtendedSuccessFailureHooks =
  (
    DataResponse: DataResponse & { shouldRun?: boolean },
    onSuccess: (...args: any[]) => any,
    onFailure = (...args: any[]) => { },
  ) =>
    match(DataResponse)
      .with({ success: true, shouldRun: true }, ({ hookData }) => onSuccess(hookData))
      .with({ success: true, shouldRun: false }, () => { })
      .with({ success: false, shouldRun: false }, () => { })
      .with({ success: false, shouldRun: true }, ({ hookData }) => onFailure(hookData))
      .run();

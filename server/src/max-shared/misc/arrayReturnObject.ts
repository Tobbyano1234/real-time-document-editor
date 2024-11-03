import httpStatus from "http-status";

export const ArrayReturnObject = (List: any[], message: string) => {
  const bool = List.length ? true : false;
  return {
    status: bool ? httpStatus.OK : httpStatus.NO_CONTENT,
    success: bool,
    message,
    payload: List
  };
};
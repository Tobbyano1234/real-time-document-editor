export const isBlankString = function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
};

export const invalidFunction = (message: string) => () => {
  throw new Error(message);
};

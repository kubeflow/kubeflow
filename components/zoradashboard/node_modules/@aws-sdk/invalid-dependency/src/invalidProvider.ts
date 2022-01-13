import { Provider } from "@aws-sdk/types";
export const invalidProvider: (message: string) => Provider<any> = (message: string) => () => Promise.reject(message);

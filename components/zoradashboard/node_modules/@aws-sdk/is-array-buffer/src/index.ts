export const isArrayBuffer = (arg: any): arg is ArrayBuffer =>
  (typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer) ||
  Object.prototype.toString.call(arg) === "[object ArrayBuffer]";

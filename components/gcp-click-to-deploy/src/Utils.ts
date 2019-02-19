import * as bcrypt from 'bcryptjs';

export function log(...args: any[]) {
  // tslint:disable-next-line:no-console
  console.log(...args);
}

export function flattenDeploymentOperationError(operation: any) {
  const error = operation.error!;
  if (error.errors) {
    return error.errors!.map((e: any) => e.message).join('\n');
  } else if (error.message) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
}

export async function wait(timeoutMs: number) {
  return new Promise(resolve => {
    window.setTimeout(() => resolve(), timeoutMs);
  });
}

export function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

import * as bcrypt from 'bcryptjs';

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/kubeflow/kubeflow/';

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

/** Retrieves a file's contents from the master branch in GitHub. */
export async function getFileContentsFromGitHub(path: string): Promise<string> {
  const url = `${GITHUB_BASE_URL}${path}`;
  try {
    const response = await fetch(`${GITHUB_BASE_URL}${path}`, {mode: 'cors'});
    if (!response.ok) {
      throw new Error(`Unable to retrieve ${url}: ${response.status}`);
    }
    return await response.text();
  } catch (err) {
    throw new Error(`Unable to retrieve ${url}: ${err}`);
  }
}

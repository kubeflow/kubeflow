type Operation = gapi.client.deploymentmanager.Operation;

export function log(...args: any[]) {
  // tslint:disable-next-line:no-console
  console.log(...args);
}

export function flattenDeploymentOperationError(operation: Operation) {
  return operation.error!.errors!.map(e => e.message).join('\n');
}

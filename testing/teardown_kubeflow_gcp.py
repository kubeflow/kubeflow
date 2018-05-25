"""Deploy Kubeflow on GCP using deployment manager and the bootstrapper."""
import argparse
import datetime
import json
import logging
import requests
from retrying import retry
import time

from googleapiclient import discovery
from googleapiclient import errors
from oauth2client.client import GoogleCredentials

from kubeflow.testing import test_helper
from testing import deploy_utils

def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
    "--project", required=True, type=str, 
    help="The project to deploy in.")
  
  parser.add_argument(
    "--name", required=True, type=str, 
    help="The name for the deployment.")
  
  args, _ = parser.parse_known_args()
  return args

def wait_for_operation(client,
                       project,
                       op_id,
                       timeout=datetime.timedelta(hours=1),
                       polling_interval=datetime.timedelta(seconds=5)):
  """Wait for the specified operation to complete.

  Args:
    client: Client for the API that owns the operation.
    project: project
    op_id: Operation id.
    timeout: A datetime.timedelta expressing the amount of time to wait before
      giving up.
    polling_interval: A datetime.timedelta to represent the amount of time to
      wait between requests polling for the operation status.

  Returns:
    op: The final operation.

  Raises:
    TimeoutError: if we timeout waiting for the operation to complete.
  """
  endtime = datetime.datetime.now() + timeout
  while True:
    op = client.operations().get(
        project=project, operation=op_id).execute()

    status = op.get("status", "")
    # Need to handle other status's
    if status == "DONE":
      return op
    if datetime.datetime.now() > endtime:
      raise TimeoutError(
        "Timed out waiting for op: {0} to complete.".format(op_id))
    time.sleep(polling_interval.total_seconds())

  # Linter complains if we don't have a return here even though its unreachable.
  return None

@retry(stop_max_attempt_number=3)
def teardown_kubeflow_gcp(_):
  """Teardown Kubeflow deployment."""
  args = parse_args()
  project = args.project
  deployment_name = args.name
  credentials = GoogleCredentials.get_application_default()
  deploy = discovery.build("deploymentmanager", "v2", credentials=credentials)

  deployments = deploy.deployments()
  
  response = None
  try: 
    logging.info("Deleting deployment %s in project %s", deployment_name, 
                 project)
    response = deployments.delete(project=project, 
                                  deployment=deployment_name).execute()
  except errors.HttpError as e:
    logging.error("Got exception %s", e)
    if not e.content:
      raise
    
    try:
      content = json.loads(e.content)
    except ValueError:
      logging.error("Could not parse content %s as json", e.content)
    
    code = content.get("error", {}).get("code")
    if code == requests.codes.not_found:
      logging.info("Deployment %s does not exist", deployment_name)
      return
    elif code == requests.codes.conflict:
      logging.warning("Deployment %s return error 409 when trying to delete. "
                      "One possible cause is deletion is already in progress", 
                      deployment_name)
    else:
      raise

  if not response:
    # An operation was most likely already in progress. Lets get that operation.
    d = deployments.get(project=project, deployment=deployment_name).execute()
    op_id = d.get("operation", {}).get("name")
    if not op_id:
      raise ValueError("Could not get operation name.")    
  else:
    op_id = response["name"]

  logging.info("Wait for deployment; operation %s", op_id)
  final_status = deploy_utils.wait_for_operation(deploy, project, op_id)
    
  op_errors = final_status.get("error", {}).get("errors", [])
  
  if op_errors:    
    logging.error("Deployment operation had errors\n%s:", json.dumps(final_status, 
                                                      sort_keys=True,
                                                      indent=2, 
                                                      separators=(',', ': ')))
  
    raise RuntimeError("Deployment operation had errors.")

  if final_status.get("status") != "DONE":
    logging.error("Deployment operation isn't done.")
    raise RuntimeError("Deployment operation isn't done.")

  if final_status.get("operationType", "").lower() != "delete":
    # Its possible that if an operation was already in progress then the
    # operation we just waited for was not a delete operation.
    # We wanted to wait for that operation to finish and then raise an error
    # so that the delete will be retried.
    message = ("Operation {0} is type {1} which is not a delete "
               "operation.").format(op_id, final_status.get("operationType"))
    logging.error(message)
    raise ValueError(message)

def main():
  test_case = test_helper.TestCase(
    name='teardown_kubeflow_gcp', test_func=teardown_kubeflow_gcp)
  test_suite = test_helper.init(
    name='deploy_kubeflow_gcp', test_cases=[test_case])
  test_suite.run()

if __name__ == "__main__":
  main()
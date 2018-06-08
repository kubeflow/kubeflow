"""Deploy Kubeflow on GCP using deployment manager and the bootstrapper."""
import argparse
import datetime
import json
import logging
import os
import requests
import time
import yaml

from googleapiclient import discovery
from googleapiclient import errors
from oauth2client.client import GoogleCredentials

from testing import deploy_utils
from kubeflow.testing import test_helper

def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
    "--project", required=True, type=str, 
    help="The project to deploy in.")
  
  parser.add_argument(
    "--name", required=True, type=str, 
    help="The name for the deployment.")

  parser.add_argument(
    "--bootstrapper_image", required=False, type=str, 
    help="The bootstrapper image for deployment.")

  parser.add_argument(
    "--tfjob_version", required=True, type=str,
    help="The tfjob version to deploy.")

  parser.add_argument(
    "--config", required=True, type=str, 
    help="The path to the YAML file for the deployment config to use.")
  
  parser.add_argument(
    "--imports", default="", type=str, 
    help=("Comma separated list of files to import as part of the deployment "
          "manager manifest"))
  
  args, _ = parser.parse_known_args()
  return args

def update_tfjob_version(config, tfjob_version):
  bootstrapper_config = yaml.load(config['resources'][0]['properties']['bootstrapperConfig'])
  for param in bootstrapper_config['app']['parameters']:
    if param['name'] == 'tfJobVersion':
      param['value'] = tfjob_version
  config['resources'][0]['properties']['bootstrapperConfig'] = yaml.dump(bootstrapper_config)

def deploy_kubeflow_gcp(_):
  """Deploy Kubeflow."""
  args = parse_args()
  project = args.project
  deployment_name = args.name
  credentials = GoogleCredentials.get_application_default()
  deploy = discovery.build("deploymentmanager", "v2", credentials=credentials)

  deployments = deploy.deployments()
  
  import_files = []
  
  if args.imports:
    import_files = args.imports.split(",")
  
  imports = []
  
  with open(args.config) as hf:
    content = hf.read()
    content_yaml = yaml.load(content)

  update_tfjob_version(content_yaml, args.tfjob_version)
  if args.bootstrapper_image:
    content_yaml['resources'][0]['properties']['bootstrapperImage'] = args.bootstrapper_image

  for f in import_files:    
    with open(f) as hf:
      name = os.path.basename(f)
      imports.append({
        "name": name,
        "content": hf.read(),
      })


  body = {
    "name": deployment_name,
    "target": {
      "config": {
        "content": yaml.dump(content_yaml),
      },
      "imports": imports,
    },  
  }

  response = None
  try: 
    logging.info("Creating deployment %s in project %s", deployment_name, 
                 project)
    response = deployments.insert(project=project, body=body).execute()
  except errors.HttpError as e:
    logging.error("Got exception %s", e)
    if not e.content:
      raise
    
    try:
      content = json.loads(e.content)
    except ValueError:
      logging.error("Could not parse content %s as json", e.content)
    
    code = content.get("error", {}).get("code")
    if code == requests.codes.CONFLICT:
      logging.info("Deployment %s already exists", deployment_name)
    else:
      raise

  if response:
    op_id = response["name"]
    
  else:
    # Get the deployment and make sure its up
    d = deployments.get(project=project, deployment=deployment_name).execute()
    op_id = d.get("operation", {}).get("name")
    if not op_id:
      raise ValueError("Could not get operation name.")
  
  logging.info("Wait for deployment; operation %s", op_id)
  final_status = deploy_utils.wait_for_operation(deploy, project, op_id)
    
  logging.info("Deployment status\n%s:", json.dumps(final_status, 
                                                    sort_keys=True,
                                                    indent=2, 
                                                    separators=(',', ': ')))
  
  if final_status.get("status") != "DONE":
    logging.error("Deployment operation isn't done.")
    raise RuntimeError("Deployment operation isn't done.")

def main():
  test_case = test_helper.TestCase(
    name='deploy_kubeflow_gcp', test_func=deploy_kubeflow_gcp)
  test_suite = test_helper.init(
    name='deploy_kubeflow_gcp', test_cases=[test_case])
  test_suite.run()

if __name__ == "__main__":
  main()

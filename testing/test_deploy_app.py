# Script to start deployment api and make request to it.
import argparse
import base64
import datetime
import logging
import os
import shutil
import subprocess
from time import sleep
from google.auth.transport.requests import Request
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials
from prometheus_client import start_http_server, Gauge

import requests
import yaml
import google.auth
import google.auth.compute_engine.credentials
import google.auth.iam
import google.oauth2.credentials
import google.oauth2.service_account

FILE_PATH = os.path.dirname(os.path.abspath(__file__))
SSL_DIR = os.path.join(FILE_PATH, "sslcert")
SSL_BUCKET = 'kubeflow-ci-deploy-cert'
IAM_SCOPE = 'https://www.googleapis.com/auth/iam'
OAUTH_TOKEN_URI = 'https://www.googleapis.com/oauth2/v4/token'
METHOD = 'GET'
SERVICE_HEALTH = Gauge('deployment_service_status',
                              '0: normal; 1: deployment not successful; 2: service down')
PROBER_HEALTH = Gauge('prober_health',
                              '0: normal; 1: not working')

def may_get_env_var(name):
  env_val = os.getenv(name)
  if env_val:
    logging.info("%s is set" % name)
    return env_val
  else:
    raise Exception("%s not set" % name)

def prepare_request_data(args):
  logging.info("prepare deploy call data")
  with open(os.path.join(FILE_PATH, "../bootstrap/config/gcp_prototype.yaml"), 'r') as conf_input:
    defaultApp = yaml.load(conf_input)["app"]

  for param in defaultApp["parameters"]:
    if param["name"] == "acmeEmail":
      param["value"] = args.email
    if param["name"] == "ipName":
      param["value"] = args.deployment + "-ip"
    if param["name"] == "hostname":
      param["value"] = "%s.endpoints.%s.cloud.goog" % (args.deployment, args.project)

  access_token = util_run('gcloud auth application-default print-access-token'.split(' '), cwd=FILE_PATH)

  client_id = may_get_env_var("CLIENT_ID")
  client_secret = may_get_env_var("CLIENT_SECRET")

  return {
    "AppConfig": defaultApp,
    "Apply": True,
    "AutoConfigure": True,
    "ClientId": base64.b64encode(client_id.encode()).decode("utf-8"),
    "ClientSecret": base64.b64encode(client_secret.encode()).decode("utf-8"),
    "Cluster": args.deployment,
    "Email": args.email,
    "IpName": args.deployment + '-ip',
    "Name": args.deployment,
    "Namespace": 'kubeflow',
    "Project": args.project,
    "ProjectNumber": args.project_number,
    # service account client id of account: kubeflow-testing@kubeflow-ci.iam.gserviceaccount.com
    "SAClientId": args.sa_client_id,
    "Token": access_token,
    "Zone": args.zone
  }

def make_e2e_call(args):
  req_data = prepare_request_data(args)
  resp = requests.post("http://kubeflow-controller.%s.svc.cluster.local:8080/kfctl/e2eDeploy" % args.namespace,
                       json=req_data)
  if resp.status_code != 200:
    raise RuntimeError("deploy request received status code: %s, message: %s" % (resp.status_code, resp.text))
  logging.info("deploy call done")

# Make 1 deployment request to serive url, return if request call successful.
def make_prober_call(args, service_account_credentials):
  logging.info("start new prober call")
  req_data = prepare_request_data(args)
  google_open_id_connect_token = get_google_open_id_connect_token(
    service_account_credentials)
  try:
    resp = requests.post("https://%s/kfctl/e2eDeploy" % args.target_url, json=req_data,
      headers={'Authorization': 'Bearer {}'.format(
        google_open_id_connect_token)})
    if resp.status_code != 200:
      # Mark service down if return code abnormal
      SERVICE_HEALTH.set(2)
      return False
  except Exception as e:
    logging.error(e)
    SERVICE_HEALTH.set(2)
    return False
  logging.info("prober call done")
  return True

# Insert ssl cert into GKE cluster
def insert_ssl_cert(args):
  logging.info("Wait till deployment is done and GKE cluster is up")
  credentials = GoogleCredentials.get_application_default()

  service = discovery.build('deploymentmanager', 'v2', credentials=credentials)
  retry_credit = 100
  while retry_credit > 0:
    retry_credit -= 1
    sleep(5)
    try:
      request = service.deployments().get(project=args.project, deployment=args.deployment)
      response = request.execute()
      if response['operation']['status'] != 'DONE':
        logging.info("Deployment running")
        continue
    except Exception as e:
      logging.info("Deployment hasn't started")
      continue
    break

  if os.path.exists(SSL_DIR):
    shutil.rmtree(SSL_DIR)
  os.mkdir(SSL_DIR)
  logging.info("donwload ssl cert and insert to GKE cluster")
  try:
    util_run(("gsutil cp gs://%s/%s/* %s" % (SSL_BUCKET, args.mode, SSL_DIR)).split(' '))
  except Exception:
    logging.warning("ssl cert for %s doesn't exist in gcs" % args.mode)
    return
  util_run(("gcloud container clusters get-credentials %s --zone %s --project %s" %
            (args.deployment, args.zone, args.project)).split(' '))
  util_run(("kubectl create -f %s" % SSL_DIR).split(' '))


def check_deploy_status(args):
  logging.info("check deployment status")
  service_account_credentials = get_service_account_credentials("CLIENT_ID")

  google_open_id_connect_token = get_google_open_id_connect_token(
    service_account_credentials)
  # Wait up to 30 minutes for IAP access test.
  retry_credit = 180
  status_code = 0
  while retry_credit > 0:
    retry_credit -= 1
    sleep(10)
    try:
      resp = requests.request(
        METHOD, "https://%s.endpoints.%s.cloud.goog" % (args.deployment, args.project),
        headers={'Authorization': 'Bearer {}'.format(
          google_open_id_connect_token)})
      status_code = resp.status_code
      if resp.status_code == 200:
        break
    except Exception:
      logging.info("IAP not ready, exception caught, retry credit: %s" % retry_credit)
      continue
    logging.info("IAP not ready, retry credit: %s" % retry_credit)

  # Optionally upload ssl cert
  if status_code == 200 and os.listdir(SSL_DIR) == []:
    for sec in ["envoy-ingress-tls", "letsencrypt-prod-secret"]:
      sec_data = util_run(("kubectl get secret %s -n kubeflow -o yaml" % sec).split(' '))
      with open(os.path.join(SSL_DIR, sec + ".yaml"), 'w+') as sec_file:
        sec_file.write(sec_data)
        sec_file.close()
    util_run(("gsutil cp %s/* gs://%s/%s/" % (SSL_DIR, SSL_BUCKET, args.mode)).split(' '))
  return status_code

def get_service_account_credentials(client_id_key):
  # Figure out what environment we're running in and get some preliminary
  # information about the service account.
  credentials, _ = google.auth.default(
    scopes=[IAM_SCOPE])
  if isinstance(credentials,
                google.oauth2.credentials.Credentials):
    raise Exception('make_iap_request is only supported for service '
                    'accounts.')

  # For service account's using the Compute Engine metadata service,
  # service_account_email isn't available until refresh is called.
  credentials.refresh(Request())

  signer_email = credentials.service_account_email
  if isinstance(credentials,
                google.auth.compute_engine.credentials.Credentials):
    signer = google.auth.iam.Signer(
      Request(), credentials, signer_email)
  else:
    # A Signer object can sign a JWT using the service account's key.
    signer = credentials.signer

  # Construct OAuth 2.0 service account credentials using the signer
  # and email acquired from the bootstrap credentials.
  return google.oauth2.service_account.Credentials(
    signer, signer_email, token_uri=OAUTH_TOKEN_URI, additional_claims={
      'target_audience': may_get_env_var(client_id_key)
    })

def get_google_open_id_connect_token(service_account_credentials):
  service_account_jwt = (
    service_account_credentials._make_authorization_grant_assertion())
  request = google.auth.transport.requests.Request()
  body = {
    'assertion': service_account_jwt,
    'grant_type': google.oauth2._client._JWT_GRANT_TYPE,
  }
  token_response = google.oauth2._client._token_endpoint_request(
    request, OAUTH_TOKEN_URI, body)
  return token_response['id_token']

def delete_gcloud_resource(args, keyword, filter='', dlt_params=[]):
  get_cmd = 'gcloud compute %s list --project=%s --format="value(name)"' % (keyword, args.project)
  elements = util_run(get_cmd + filter, shell=True)
  for element in elements.split('\n'):
    dlt_cmd = 'gcloud compute %s delete -q --project=%s %s' % (keyword, args.project, element)
    try:
      util_run(dlt_cmd.split(' ') + dlt_params)
    except Exception:
      logging.warning('Cannot remove %s %s' % (keyword, element))

# clean up deployment / app config from previous test
def prober_clean_up_resource(args):
  logging.info("Clean up project resource (source repo, backend service and deployment)")

  # Delete source repo
  sr_cmd = 'gcloud -q source repos delete %s-kubeflow-config --project=%s' % (args.project, args.project)
  try:
    util_run(sr_cmd.split(' '), cwd=FILE_PATH)
  except Exception as e:
    logging.warning(e)

  # Delete deployment
  credentials = GoogleCredentials.get_application_default()
  service = discovery.build('deploymentmanager', 'v2', credentials=credentials)
  delete_done = False
  try:
    request = service.deployments().delete(project=args.project, deployment=args.deployment)
    response = request.execute()
  except Exception as e:
    logging.info("Deployment doesn't exist, continue")
  # wait up to 500 seconds till delete finish.
  for i in range(50):
    sleep(10)
    request = service.deployments().list(project=args.project)
    response = request.execute()
    if ('deployments' not in response) or (args.deployment not in [d['name'] for d in response['deployments']]):
      delete_done = True
      break

  # Delete target-http-proxies
  delete_gcloud_resource(args, 'target-http-proxies')
  # Delete url-maps
  delete_gcloud_resource(args, 'url-maps')
  # Delete backend-services
  delete_gcloud_resource(args, 'backend-services', dlt_params=['--global'])
  # Delete instance-groups
  delete_gcloud_resource(args, 'instance-groups unmanaged', filter=' --filter=INSTANCES:0')

  return delete_done

def util_run(command,
        cwd=None,
        env=None,
        shell=False,
        polling_interval=datetime.timedelta(seconds=1)):
  """Run a subprocess.

  Any subprocess output is emitted through the logging modules.

  Returns:
    output: A string containing the output.
  """
  logging.info("Running: %s \ncwd=%s", " ".join(command), cwd)

  if not env:
    env = os.environ
  else:
    keys = sorted(env.keys())

    lines = []
    for k in keys:
      lines.append("{0}={1}".format(k, env[k]))
    logging.info("Running: Environment:\n%s", "\n".join(lines))

  process = subprocess.Popen(
    command, cwd=cwd, env=env, shell=shell, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

  # logging.info("Subprocess output:\n")
  output = []
  while process.poll() is None:
    process.stdout.flush()
    for line in iter(process.stdout.readline, ''):
      output.append(line.strip('\n'))
      # logging.info(line.strip())

    sleep(polling_interval.total_seconds())

  process.stdout.flush()
  for line in iter(process.stdout.readline, b''):
    output.append(line.strip('\n'))
    # logging.info(line.strip())

  if process.returncode != 0:
    raise subprocess.CalledProcessError(
      process.returncode, "cmd: {0} exited with code {1}".format(
        " ".join(command), process.returncode), "\n".join(output))

  return "\n".join(output)

# Clone repos to tmp folder and build docker images
def main(unparsed_args=None):
  parser = argparse.ArgumentParser(
    description="Start deployment api and make request to it.")

  parser.add_argument(
    "--deployment",
    default="periodic-test",
    type=str,
    help="Deployment name.")
  parser.add_argument(
    "--email",
    default="google-kubeflow-support@google.com",
    type=str,
    help="Email used during e2e test")
  parser.add_argument(
    "--project",
    default="kubeflow-ci-deploy",
    type=str,
    help="e2e test project id")
  parser.add_argument(
    "--project_number",
    default="453914067825",
    type=str,
    help="e2e test project number")
  parser.add_argument(
    "--namespace",
    default="",
    type=str,
    help="namespace where deployment service is running")
  parser.add_argument(
    "--target_url",
    default="deploy.kubeflow.cloud",
    type=str,
    help="target url which accept deployment request")
  # parser.add_argument(
  #   "--client_id",
  #   default="",
  #   type=str,
  #   help="oauth client id")
  # parser.add_argument(
  #   "--client_secret",
  #   default="",
  #   type=str,
  #   help="oauth client secret")
  parser.add_argument(
    "--wait_sec",
    default=60,
    type=int,
    help="oauth client secret")
  parser.add_argument(
    "--zone",
    default="us-east1-d",
    type=str,
    help="GKE cluster zone")
  parser.add_argument(
    "--sa_client_id",
    default="111670663612681935351",
    type=str,
    help="Service account client id")
  parser.add_argument(
    "--mode",
    default="e2e",
    type=str,
    help="offer three test mode: e2e, prober, and load_test")

  args = parser.parse_args(args=unparsed_args)

  util_run(('gcloud auth activate-service-account --key-file=' +
            may_get_env_var("GOOGLE_APPLICATION_CREDENTIALS")).split(' '), cwd=FILE_PATH)
  if args.mode == "e2e":
    sleep(args.wait_sec)
    make_e2e_call(args)
    insert_ssl_cert(args)
    if check_deploy_status(args) != 200:
      raise RuntimeError("IAP endpoint not ready after 30 minutes, time out...")

  if args.mode == "prober":
    start_http_server(8000)
    SERVICE_HEALTH.set(0)
    PROBER_HEALTH.set(0)
    service_account_credentials = get_service_account_credentials("SERVICE_CLIENT_ID")
    while True:
      if not prober_clean_up_resource(args):
        PROBER_HEALTH.set(1)
        logging.error("request cleanup failed, retry in %s seconds" % args.wait_sec)
        sleep(args.wait_sec)
        continue
      PROBER_HEALTH.set(0)
      if make_prober_call(args, service_account_credentials):
        insert_ssl_cert(args)
        if check_deploy_status(args) == 200:
          SERVICE_HEALTH.set(0)
        else:
          SERVICE_HEALTH.set(1)
      else:
        SERVICE_HEALTH.set(2)
        logging.error("prober request failed, retry in %s seconds" % args.wait_sec)
        sleep(args.wait_sec)


if __name__ == '__main__':
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
            '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S', )
  logging.getLogger('googleapiclient.discovery_cache').setLevel(logging.ERROR)
  logging.getLogger().setLevel(logging.INFO)
  main()

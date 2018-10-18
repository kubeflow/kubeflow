# Script to start deployment api and make request to it.
import argparse
import base64
import logging
import os
import shutil
from time import sleep
from google.auth.transport.requests import Request
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

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
logging.getLogger('googleapiclient.discovery_cache').setLevel(logging.ERROR)

def may_get_env_var(name):
  env_val = os.getenv(name)
  if env_val:
    logging.info("%s is set" % name)
    return env_val
  else:
    raise Exception("%s not set" % name)

def make_deploy_call(args):
  print("prepare deploy call data")
  with open(os.path.join(FILE_PATH, "../bootstrap/config/gcp_prototype.yaml"), 'r') as conf_input:
    defaultApp = yaml.load(conf_input)["app"]

  for param in defaultApp["parameters"]:
    if param["name"] == "acmeEmail":
      param["value"] = args.email
    if param["name"] == "ipName":
      param["value"] = args.deployment + "-ip"
    if param["name"] == "hostname":
      param["value"] = "%s.endpoints.%s.cloud.goog" % (args.deployment, args.project)

  os.system('gcloud auth activate-service-account --key-file=' + may_get_env_var("GOOGLE_APPLICATION_CREDENTIALS"))
  result = os.popen('gcloud auth application-default print-access-token').read()
  access_token = result[:-1]

  client_id = may_get_env_var("CLIENT_ID")
  client_secret = may_get_env_var("CLIENT_SECRET")

  req_data = {
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
    "SAClientId": "111670663612681935351",
    "Token": access_token,
    "Zone": args.zone
  }
  resp = requests.post("http://kubeflow-controller.%s.svc.cluster.local:8080/kfctl/e2eDeploy" % args.namespace, json=req_data)
  if resp.status_code != 200:
    raise RuntimeError("deploy request received status code: %s, message: %s" % (resp.status_code, resp.text))
  print("deploy call done")

# Insert ssl cert into GKE cluster
def insert_ssl_cert(args):
  print("Wait till deployment is done and GKE cluster is up")
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
        print("Deployment running")
        continue
    except Exception as e:
      print("Deployment hasn't started")
      continue
    break

  if os.path.exists(SSL_DIR):
    shutil.rmtree(SSL_DIR)
  os.mkdir(SSL_DIR)
  print("donwload ssl cert and insert to GKE cluster")
  os.system("gsutil cp gs://%s/%s/* %s" % (SSL_BUCKET, args.cert_group, SSL_DIR))
  os.system("gcloud container clusters get-credentials %s --zone %s --project %s" % (args.deployment, args.zone, args.project))
  os.system("kubectl create -f %s" % SSL_DIR)


def check_deploy_status(args):
  print("check deployment status")
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
  service_account_credentials = google.oauth2.service_account.Credentials(
    signer, signer_email, token_uri=OAUTH_TOKEN_URI, additional_claims={
      'target_audience': may_get_env_var("CLIENT_ID")
    })

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
      print("IAP not ready, exception caught, retry credit: %s" % retry_credit)
      continue
    print("IAP not ready, retry credit: %s" % retry_credit)

  if status_code != 200:
    raise RuntimeError("IAP endpoint not ready after 30 minutes, time out...")
  else:
    # Optionally upload ssl cert
    if os.listdir(SSL_DIR) == []:
      for sec in ["envoy-ingress-tls", "letsencrypt-prod-secret"]:
        os.system("kubectl get secret %s -n kubeflow -o yaml > %s" % (sec, os.path.join(SSL_DIR, sec + ".yaml")))
      os.system("gsutil cp %s/* gs://%s/%s/" % (SSL_DIR, SSL_BUCKET, args.cert_group))

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
    "--SA_CREDENTIALS",
    default="",
    type=str,
    help="service account credential file")
  parser.add_argument(
    "--client_id",
    default="",
    type=str,
    help="oauth client id")
  parser.add_argument(
    "--client_secret",
    default="",
    type=str,
    help="oauth client secret")
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
    "--cert_group",
    default="e2e",
    type=str,
    help="cert folder in GCS bucket, valid values are e2e, prober0, prober1")
  parser.add_argument(
    "--mode",
    default="e2e",
    type=str,
    help="offer three test mode: e2e, prober, and load test")

  args = parser.parse_args(args=unparsed_args)

  if args.mode == "e2e":
    sleep(args.wait_sec)
    make_deploy_call(args)
    insert_ssl_cert(args)
    check_deploy_status(args)

if __name__ == '__main__':
  main()

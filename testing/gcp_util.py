import argparse
import base64
import datetime
import logging
import os
import errno
import shutil
import subprocess
import tempfile
import threading
from functools import partial
from multiprocessing import Process
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
from retrying import retry

IAM_SCOPE = "https://www.googleapis.com/auth/iam"
OAUTH_TOKEN_URI = "https://www.googleapis.com/oauth2/v4/token"

def get_service_account_credentials(client_id_key):
  # Figure out what environment we're running in and get some preliminary
  # information about the service account.
  credentials, _ = google.auth.default(scopes=[IAM_SCOPE])
  if isinstance(credentials, google.oauth2.credentials.Credentials):
    raise Exception("make_iap_request is only supported for service "
                    "accounts.")

  # For service account's using the Compute Engine metadata service,
  # service_account_email isn't available until refresh is called.
  credentials.refresh(Request())

  signer_email = credentials.service_account_email
  if isinstance(credentials,
                google.auth.compute_engine.credentials.Credentials):
    signer = google.auth.iam.Signer(Request(), credentials, signer_email)
  else:
    # A Signer object can sign a JWT using the service account's key.
    signer = credentials.signer

  # Construct OAuth 2.0 service account credentials using the signer
  # and email acquired from the bootstrap credentials.
  return google.oauth2.service_account.Credentials(
      signer,
      signer_email,
      token_uri=OAUTH_TOKEN_URI,
      additional_claims={"target_audience": may_get_env_var(client_id_key)})

def get_google_open_id_connect_token(service_account_credentials):
  service_account_jwt = (
      service_account_credentials._make_authorization_grant_assertion())
  request = google.auth.transport.requests.Request()
  body = {
      "assertion": service_account_jwt,
      "grant_type": google.oauth2._client._JWT_GRANT_TYPE,
  }
  token_response = google.oauth2._client._token_endpoint_request(
      request, OAUTH_TOKEN_URI, body)
  return token_response["id_token"]

def may_get_env_var(name):
  env_val = os.getenv(name)
  if env_val:
    logging.info("%s is set" % name)
    return env_val
  else:
    raise Exception("%s not set" % name)

def endpoint_is_ready(url, wait_min=15):
  """
  Checks if the kubeflow endpoint is ready.

  Args:
    url: The url endpoint
  Returns:
    True if the url is ready
  """
  service_account_credentials = get_service_account_credentials("CLIENT_ID")

  google_open_id_connect_token = get_google_open_id_connect_token(
      service_account_credentials)
  # Wait up to 30 minutes for IAP access test.
  num_req = 0
  end_time = datetime.datetime.now() + datetime.timedelta(
      minutes=wait_min)
  while datetime.datetime.now() < end_time:
    sleep(10)
    num_req += 1
    logging.info("Trying url: %s", url)
    try:
      resp = requests.request(
          "GET",
          url,
          headers={
              "Authorization":
              "Bearer {}".format(google_open_id_connect_token)
          },
          verify=False)
      logging.info(resp.text)
      if resp.status_code == 200:
        logging.info("IAP is ready for %s!", url)
        return True
      else:
        logging.info(
            "%s: IAP not ready, request number: %s" % (url, num_req))
    except Exception as e:
      logging.info("%s: IAP not ready, exception caught %s, request number: %s" %
                   (url, str(e), num_req))
  return False

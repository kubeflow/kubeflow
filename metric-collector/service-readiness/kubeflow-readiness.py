# -*- coding: utf-8 -*-
import argparse
import google.auth
import google.auth.app_engine
import google.auth.compute_engine.credentials
import google.auth.iam
import google.oauth2.credentials
import google.oauth2.service_account
import logging
import requests
from google.auth.transport.requests import Request
from kubernetes import client, config
from kubernetes.client import V1Event, V1ObjectMeta
from prometheus_client import start_http_server, Gauge
from time import sleep, time

IAM_SCOPE = 'https://www.googleapis.com/auth/iam'
OAUTH_TOKEN_URI = 'https://www.googleapis.com/oauth2/v4/token'
METHOD = 'GET'
KUBEFLOW_AVAILABILITY = \
    Gauge('kubeflow_availability',
          'Signal of whether IAP protected kubeflow is available')


def metric_update(args, google_open_id_connect_token):
  resp = requests.request(
      METHOD,
      args.url,
      headers={
          'Authorization': 'Bearer {}'.format(google_open_id_connect_token)
      })
  if resp.status_code == 200:
    KUBEFLOW_AVAILABILITY.set(1)
    return 1
  else:
    KUBEFLOW_AVAILABILITY.set(0)
    return 0


def main(unparsed_args=None):
  parser = argparse.ArgumentParser(
      description="Output signal of kubeflow service readiness.")

  parser.add_argument(
      "--url", default="", type=str, help="kubeflow IAP-protected url")
  parser.add_argument(
      "--client_id",
      default="",
      type=str,
      help="Service account json credential file")

  args = parser.parse_args(args=unparsed_args)

  if args.url == "" or args.client_id == "":
    logging.info("Url or client_id is empty, exit")
    return

  # Figure out what environment we're running in and get some preliminary
  # information about the service account.
  credentials, _ = google.auth.default(scopes=[IAM_SCOPE])
  if isinstance(credentials, google.oauth2.credentials.Credentials):
    raise Exception('make_iap_request is only supported for service '
                    'accounts.')

  # For service account's using the Compute Engine metadata service,
  # service_account_email isn't available until refresh is called.
  credentials.refresh(Request())

  signer_email = credentials.service_account_email
  if isinstance(credentials,
                google.auth.compute_engine.credentials.Credentials):
    # Since the Compute Engine metadata service doesn't expose the service
    # account key, we use the IAM signBlob API to sign instead.
    # In order for this to work:
    #
    # 1. Your VM needs the https://www.googleapis.com/auth/iam scope. You
    #    can specify this specific scope when creating a VM through the API
    #    or gcloud. When using Cloud Console, you'll need to specify the
    #    full access to all Cloud APIs" scope. A VM's scopes can only be
    #    specified at creation time.
    #
    # 2. The VM's default service account needs the "Service Account Actor"
    #    role. This can be found under the "Project" category in Cloud
    #    Console, or roles/iam.serviceAccountActor in gcloud.
    signer = google.auth.iam.Signer(Request(), credentials, signer_email)
  else:
    # A Signer object can sign a JWT using the service account's key.
    signer = credentials.signer

  # Construct OAuth 2.0 service account credentials using the signer and
  # email acquired from the bootstrap credentials.
  service_account_credentials = google.oauth2.service_account.Credentials(
      signer,
      signer_email,
      token_uri=OAUTH_TOKEN_URI,
      additional_claims={'target_audience': args.client_id})

  token_refresh_time = 0
  last_status = -1
  config.load_incluster_config()
  coreApi = client.CoreV1Api()
  while True:
    if time() > token_refresh_time:
      # service_account_credentials gives us a JWT signed by the service
      # account. Next, we use that to obtain an OpenID Connect token,
      # which is a JWT signed by Google.
      google_open_id_connect_token = get_google_open_id_connect_token(
          service_account_credentials)
      token_refresh_time = time() + 1800
    url_status = metric_update(args, google_open_id_connect_token)
    if url_status != last_status:
      last_status = url_status
      # get service centraldashboard, attach event to it.
      svcs = coreApi.list_namespaced_service(
          'kubeflow', label_selector="app=centraldashboard")
      while len(svcs.to_dict()['items']) == 0:
        logging.info("Service centraldashboard not ready...")
        sleep(10)
        svcs = coreApi.list_namespaced_service(
            'kubeflow', label_selector="app=centraldashboard")
      uid = svcs.to_dict()['items'][0]['metadata']['uid']
      kf_status = "up" if url_status == 1 else "down"
      new_event = V1Event(
          action="Kubeflow service status update: " + kf_status,
          api_version="v1",
          kind="Event",
          message="Service " + kf_status + "; service url: " + args.url,
          reason="Kubeflow Service is " + kf_status,
          involved_object=client.V1ObjectReference(
              api_version="v1",
              kind="Service",
              name="centraldashboard",
              namespace="kubeflow",
              uid=uid),
          metadata=V1ObjectMeta(generate_name='kubeflow-service.',),
          type="Normal")
      event = coreApi.create_namespaced_event("kubeflow", new_event)
      print("New status event created. action='%s'" % str(event.action))

    # Update status every 10 sec
    sleep(10)


def get_google_open_id_connect_token(service_account_credentials):
  """
  Get an OpenID Connect token issued by Google for the service account.

  This function:

    1. Generates a JWT signed with the service account's private key containing
       a special "target_audience" claim.

    2. Sends it to the OAUTH_TOKEN_URI endpoint. Because the JWT in #1 has a
       target_audience claim, that endpoint will respond with an OpenID Connect
       token for the service account -- in other words, a JWT signed by
       *Google*. The aud claim in this JWT will be set to the value from the
       target_audience claim in #1.

  For more information, see
  https://developers.google.com/identity/protocols/OAuth2ServiceAccount
  The HTTP/REST example on that page describes the JWT structure and
  demonstrates how to call the token endpoint. (The example on that paga shows
  how to get an OAuth2 access token; this code is using a modified version of it
  to get an OpenID Connect token.)
  """

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


if __name__ == '__main__':
  start_http_server(8000)
  main()

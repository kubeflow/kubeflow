# From https://cloud.google.com/iap/docs/authentication-howto#iap-make-request-python
import google.auth
import google.auth.app_engine
import google.auth.compute_engine.credentials
import google.auth.iam
from google.auth.transport.requests import Request
import google.oauth2.credentials
import google.oauth2.service_account
import requests
import requests_toolbelt.adapters.appengine


IAM_SCOPE = 'https://www.googleapis.com/auth/iam'
OAUTH_TOKEN_URI = 'https://www.googleapis.com/oauth2/v4/token'


def make_iap_request(url, client_id):
  """Makes a request to an application protected by Identity-Aware Proxy.

  Args:
    url: The Identity-Aware Proxy-protected URL to fetch.
    client_id: The client ID used by Identity-Aware Proxy.

  Returns:
    The page body, or raises an exception if the page couldn't be retrieved.
  """
  # Figure out what environment we're running in and get some preliminary
  # information about the service account.
  bootstrap_credentials, _ = google.auth.default(
      scopes=[IAM_SCOPE])
  if isinstance(bootstrap_credentials,
                google.oauth2.credentials.Credentials):
    raise Exception('make_iap_request is only supported for service '
                    'accounts.')
  elif isinstance(bootstrap_credentials,
                  google.auth.app_engine.Credentials):
    requests_toolbelt.adapters.appengine.monkeypatch()

  # For service account's using the Compute Engine metadata service,
  # service_account_email isn't available until refresh is called.
  bootstrap_credentials.refresh(Request())

  signer_email = bootstrap_credentials.service_account_email
  if isinstance(bootstrap_credentials,
                google.auth.compute_engine.credentials.Credentials):
    # Since the Compute Engine metadata service doesn't expose the service
    # account key, we use the IAM signBlob API to sign instead.
    # In order for this to work:
    #
    # 1. Your VM needs the https://www.googleapis.com/auth/iam scope.
    #    You can specify this specific scope when creating a VM
    #    through the API or gcloud. When using Cloud Console,
    #    you'll need to specify the "full access to all Cloud APIs"
    #    scope. A VM's scopes can only be specified at creation time.
    #
    # 2. The VM's default service account needs the "Service Account Actor"
    #    role. This can be found under the "Project" category in Cloud
    #    Console, or roles/iam.serviceAccountActor in gcloud.
    signer = google.auth.iam.Signer(
        Request(), bootstrap_credentials, signer_email)
  else:
    # A Signer object can sign a JWT using the service account's key.
    signer = bootstrap_credentials.signer

  # Construct OAuth 2.0 service account credentials using the signer
  # and email acquired from the bootstrap credentials.
  service_account_credentials = google.oauth2.service_account.Credentials(
      signer, signer_email, token_uri=OAUTH_TOKEN_URI, additional_claims={
          'target_audience': client_id
      })

  # service_account_credentials gives us a JWT signed by the service
  # account. Next, we use that to obtain an OpenID Connect token,
  # which is a JWT signed by Google.
  google_open_id_connect_token = get_google_open_id_connect_token(
      service_account_credentials)

  # Fetch the Identity-Aware Proxy-protected URL, including an
  # Authorization header containing "Bearer " followed by a
  # Google-issued OpenID Connect token for the service account.
  resp = requests.get(
      url,
      verify=False,
      headers={'Authorization': 'Bearer {}'.format(
          google_open_id_connect_token)})
  if resp.status_code == 403:
    raise Exception('Service account {} does not have permission to '
                    'access the IAP-protected application.'.format(
                        signer_email))
  elif resp.status_code != 200:
    raise Exception(
        'Bad response from application: {!r} / {!r} / {!r}'.format(
            resp.status_code, resp.headers, resp.text))
  else:
    return resp.text


def get_google_open_id_connect_token(service_account_credentials):
  """Get an OpenID Connect token issued by Google for the service account.

  This function:
    1. Generates a JWT signed with the service account's private key
       containing a special "target_audience" claim.

    2. Sends it to the OAUTH_TOKEN_URI endpoint. Because the JWT in #1
       has a target_audience claim, that endpoint will respond with
       an OpenID Connect token for the service account -- in other words,
       a JWT signed by *Google*. The aud claim in this JWT will be
       set to the value from the target_audience claim in #1.

  For more information, see
  https://developers.google.com/identity/protocols/OAuth2ServiceAccount .
  The HTTP/REST example on that page describes the JWT structure and
  demonstrates how to call the token endpoint. (The example on that page
  shows how to get an OAuth2 access token; this code is using a
  modified version of it to get an OpenID Connect token.)
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

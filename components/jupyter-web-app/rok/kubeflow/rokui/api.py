import os
import base64
from kubernetes.client.rest import ApiException
from baseui.utils import create_logger
from baseui.api import v1_core

logger = create_logger(__name__)


def parse_user_template(string):
  return string.format(username="user")


def get_rok_token(ns):
  """Retrieve the token to authenticate with Rok."""
  secret = None
  nm = ''
  if os.environ.get('ROK_SECRET_NAME') != 'null':
    nm = os.environ.get('ROK_SECRET_NAME')
    nm = parse_user_template(nm)

  try:
    secret = v1_core.read_namespaced_secret(name=nm, namespace=ns)
  except ApiException:
    return ''

  token = secret.data.get('token', '')

  return base64.b64decode(token).decode('utf-8')

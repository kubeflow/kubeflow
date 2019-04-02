import os
import base64
from kubernetes.client.rest import ApiException
from kubernetes import client
from ..common import utils
from ..common import api

ROK_SECRET_MOUNT = "/var/run/secrets/rok"
logger = utils.create_logger(__name__)


def parse_user_template(string):
  return string.format(username="user")


def rok_secret_name():
  secret = ''
  if os.environ.get('ROK_SECRET_NAME') is not None:
    secret = os.environ.get('ROK_SECRET_NAME')
    secret = parse_user_template(secret)

  return secret


def attach_rok_token_secret(notebook, body):
  # Mount the Rok token as a Volume
  secret_name = rok_secret_name()
  secret_volume_name = 'volume-%s' % secret_name
  utils.add_notebook_volume_secret(
      notebook,
      secret_volume_name,
      secret_name,
      ROK_SECRET_MOUNT,
      420
  )

  # Set ENV variables needed for rok cli
  notebook["spec"]['template']['spec']['containers'][0]['env'] += [
      {
          'name': 'ROK_GW_TOKEN',
          'value': 'file:%s/token' % ROK_SECRET_MOUNT
      },
      {
          'name': 'ROK_GW_URL',
          'value': 'file:%s/url' % ROK_SECRET_MOUNT
      },
      {
          'name': 'ROK_GW_PARAM_REGISTER_JUPYTER_LAB',
          'value': body['nm'] + '-0'
      },
  ]


def get_rok_token(ns):
  """Retrieve the token to authenticate with Rok."""
  secret = None
  nm = rok_secret_name()

  try:
    secret = api.v1_core.read_namespaced_secret(name=nm, namespace=ns)
  except ApiException as e:
    logger.warning("Couldn't load ROK token: %s" % api.parse_error(e))
    return ''

  if secret.data is None:
    logger.warning("ROK Secret doesn't exist in namespace '%s'" % ns)
    return ''

  token = secret.data.get('token', '')

  return base64.b64decode(token).decode('utf-8')


def create_workspace_pvc(body):
  # If the type is New, then create a new PVC, else use an existing one
  # It always deletes the current one and creates a new
  annotations = {
      "rok/creds-secret-name": rok_secret_name(),
      "jupyter-workspace": body["ws_name"],
  }

  if body["ws_type"] == "Existing":
    annotations['rok/origin'] = body["ws_rok_url"]

  labels = {"component": "singleuser-storage"}

  # Create a PVC for the New/Existing Type
  pvc = client.V1PersistentVolumeClaim(
      metadata=client.V1ObjectMeta(
          name=body['ws_name'],
          namespace=body['ns'],
          annotations=annotations,
          labels=labels,
      ),
      spec=client.V1PersistentVolumeClaimSpec(
          access_modes=['ReadWriteOnce'],
          resources=client.V1ResourceRequirements(
              requests={
                  'storage': body['ws_size'] + 'Gi'
              }
          )
      )
  )

  delete_existing_pvc(pvc.metadata.name, pvc.metadata.namespace)
  provision_new_pvc(pvc)


def create_datavol_pvc(body, i):
  # It always deletes the current one and creates a new
  pvc_nm = body['vol_name' + i]
  size = body['vol_size' + i] + 'Gi'

  annotations = {
      "rok/creds-secret-name": rok_secret_name(),
      "jupyter-dataset": pvc_nm,
  }

  if body["ws_type"] == "Existing":
    annotations['rok/origin'] = body["vol_rok_url" + i]

  labels = {"component": "singleuser-storage"}

  # Create a PVC for the New/Existing Type
  pvc = client.V1PersistentVolumeClaim(
      metadata=client.V1ObjectMeta(
          name=pvc_nm,
          namespace=body['ns'],
          annotations=annotations,
          labels=labels,
      ),
      spec=client.V1PersistentVolumeClaimSpec(
          access_modes=['ReadWriteOnce'],
          resources=client.V1ResourceRequirements(
              requests={
                  'storage': size
              }
          )
      )
  )

  delete_existing_pvc(pvc.metadata.name, pvc.metadata.namespace)
  provision_new_pvc(pvc)


def delete_existing_pvc(pvc_name, namespace):
  """Issue a K8s API request to delete a namespaced PVC, if exists."""
  delete_options = client.V1DeleteOptions()
  del_status = None
  try:
    del_status = api.v1_core.delete_namespaced_persistent_volume_claim(
        name=pvc_name,
        namespace=namespace,
        body=delete_options)
  except ApiException as e:
    if e.status == 404:
      # The PVC does not exist
      return del_status
    else:
      logger.warning('Could not delete PVC %s' % pvc_name)

  while True:
    try:
      api.v1_core.read_namespaced_persistent_volume_claim(
          name=pvc_name,
          namespace=namespace)
    except ApiException as e:
      if e.status == 404:
        logger.info('PVC %s was successfully deleted', pvc_name)
        break


def provision_new_pvc(pvc_manifest):
  """Issue a K8s API request to create a new, namespaced PVC."""
  # Create a V1PersistentVolumeClaim for the API call
  try:
    api.v1_core.create_namespaced_persistent_volume_claim(
        namespace=pvc_manifest.metadata.namespace,
        body=pvc_manifest)

  except ApiException as e:
    if e.status == 409:
      logger.warning('PVC %s already exists. New PVC not created.',
                     pvc_manifest.metadata.name)
    logger.info(e.reason)
    return

  logger.info('PVC %s was successfully created',
              pvc_manifest.metadata.name)

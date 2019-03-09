# -*- coding: utf-8 -*-
import json
import base64
import os
from kubernetes import client, config
from kubernetes.config import ConfigException
from kubernetes.client.rest import ApiException
from kubeflow.rokui.utils import parse_user_template

try:
  # Load configuration inside the Pod
  config.load_incluster_config()
except ConfigException:
  # Load configuration for testing
  config.load_kube_config()

# Create the Apis
v1_core = client.CoreV1Api()
custom_api = client.CustomObjectsApi()


def parse_error(e):
  try:
    err = json.loads(e.body)['message']
  except json.JSONDecodeError:
    err = str(e)
  except KeyError:
    err = str(e)

  return err


def get_secret(nm, ns):
  return v1_core.read_namespaced_secret(nm, ns)


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


def create_workspace_pvc(body):
  """If the type is New, then create a new PVC, else use an existing one"""
  if body["ws_type"] == "New":
    pvc = client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=body['ws_name'],
            namespace=body['ns']
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[body['ws_access_modes']],
            resources=client.V1ResourceRequirements(
                requests={
                    'storage': body['ws_size'] + 'Gi'
                }
            )
        )
    )

    create_pvc(pvc)

  return


def create_datavol_pvc(body, i):
  pvc_nm = body['vol_name' + i]

  # Create a PVC if its a new Data Volume
  if body["vol_type" + i] == "New":
    size = body['vol_size' + i] + 'Gi'
    mode = body['vol_access_modes' + i]

    pvc = client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=pvc_nm,
            namespace=body['ns']
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[mode],
            resources=client.V1ResourceRequirements(
                requests={
                    'storage': size
                }
            )
        )
    )

    create_pvc(pvc)

  return


def get_namespaces():
  nmsps = v1_core.list_namespace()
  return [ns.metadata.name for ns in nmsps.items]


def get_notebooks(ns):
  custom_api = client.CustomObjectsApi()

  notebooks = \
      custom_api.list_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                               ns, "notebooks")
  return [nb['metadata']['name'] for nb in notebooks['items']]


def delete_notebook(nb, ns):
  body = client.V1DeleteOptions()

  return \
      custom_api.delete_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                                 ns, "notebooks", nb, body)


def create_notebook(body):
  ns = body['metadata']['namespace']
  return \
      custom_api.create_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                                 ns, "notebooks", body)


def create_pvc(body):
  ns = body.metadata.namespace
  return v1_core.create_namespaced_persistent_volume_claim(ns, body)

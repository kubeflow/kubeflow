import json
from kubernetes import client, config
from kubernetes.config import ConfigException
from .utils import create_logger, get_notebook_uptime

logger = create_logger(__name__)

try:
  # Load configuration inside the Pod
  config.load_incluster_config()
except ConfigException:
  # Load configuration for testing
  config.load_kube_config()

# Create the Apis
v1_core = client.CoreV1Api()
custom_api = client.CustomObjectsApi()
storage_api = client.StorageV1Api()


def parse_error(e):
  try:
    err = json.loads(e.body)["message"]
  except (json.JSONDecodeError, KeyError, AttributeError):
    err = str(e)

  return err


def create_workspace_pvc(body):
  # body: Dict (request body)
  """If the type is New, then create a new PVC, else use an existing one"""
  if body["ws_type"] == "New":
    pvc = client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=body["ws_name"],
            namespace=body["ns"]
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[body["ws_access_modes"]],
            resources=client.V1ResourceRequirements(
                requests={
                    "storage": body["ws_size"] + "Gi"
                }
            )
        )
    )

    create_pvc(pvc)

  return


def create_datavol_pvc(body, i):
  # body: Dict (request body)
  pvc_nm = body["vol_name" + i]

  # Create a PVC if its a new Data Volume
  if body["vol_type" + i] == "New":
    size = body["vol_size" + i] + "Gi"
    mode = body["vol_access_modes" + i]

    pvc = client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=pvc_nm,
            namespace=body["ns"]
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[mode],
            resources=client.V1ResourceRequirements(
                requests={
                    "storage": size
                }
            )
        )
    )

    create_pvc(pvc)

  return


def get_secret(nm, ns):
  # nm: string
  # ns: string
  return v1_core.read_namespaced_secret(nm, ns)


def get_pvcs(ns):
  pvcs = v1_core.list_namespaced_persistent_volume_claim(namespace=ns).items
  return [pvc.metadata.name for pvc in pvcs]


def get_default_storageclass():
  strg_classes = storage_api.list_storage_class().items
  for strgclss in strg_classes:
    annotations = strgclss.metadata.annotations
    # List of possible annotations
    keys = [
        "storageclass.kubernetes.io/is-default-class",
        "storageclass.beta.kubernetes.io/is-default-class"  # GKE
    ]

    for key in keys:
      is_default = annotations.get(key, False)
      if is_default:
        return strgclss.metadata.name

  # No StorageClass is default
  return ""


def get_namespaces():
  nmsps = v1_core.list_namespace()
  return [ns.metadata.name for ns in nmsps.items]


def get_notebooks(ns):
  custom_api = client.CustomObjectsApi()

  notebooks = \
      custom_api.list_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                               ns, "notebooks")['items']

  # Generate the list with the needed fields from the Notebooks
  nbs = []
  for nb in notebooks:
    cntr = nb['spec']['template']['spec']['containers'][0]
    image = cntr['image'],
    short_image = image[0].split("/")[-1].split(':')[0]

    # In case the controller hasn't created the Status property
    # notify the user
    try:
      status = nb['status']['containerState']
      pods = nb['status']['readyReplicas']
    except KeyError:
      status = {
          'waiting': {
              'reason': 'No Status Available'
          }
      }
      pods = 0

    nbs.append({
        'name': nb['metadata']['name'],
        'namespace': nb['metadata']['namespace'],
        'cpu': cntr['resources']['requests']['cpu'],
        'mem': cntr['resources']['requests']['memory'],
        'image': cntr['image'],
        'srt_image': short_image,
        'uptime': get_notebook_uptime(nb['metadata']['creationTimestamp']),
        'volumes': nb['spec']['template']['spec']['volumes'],
        'status': status,
        'pods': pods,
    })
  return nbs


def delete_notebook(nb, ns):
  # nb: Dict
  options = client.V1DeleteOptions()

  return \
      custom_api.delete_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                                 ns, "notebooks", nb, options)


def create_notebook(nb):
  # nb: Dict
  ns = nb["metadata"]["namespace"]
  return \
      custom_api.create_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                                 ns, "notebooks", nb)


def create_pvc(body):
  ns = body.metadata.namespace
  return v1_core.create_namespaced_persistent_volume_claim(ns, body)

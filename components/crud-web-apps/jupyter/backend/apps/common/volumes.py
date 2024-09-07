"""
The following are helper functions to handle the volumes of a Notebook.
The new API Volume will work with objects of the following format:

volume:
  mount: "mount path"
  newPvc?:
    metadata: ...
    spec: ...
  existingSource?:
    nfs?: ...
    persistentVolumeClaim?: ...
    ...

These functions will parse such objects and map them to K8s constructs.
"""
from kubernetes import client
from werkzeug.exceptions import BadRequest

from kubeflow.kubeflow.crud_backend import api, logging

from . import utils

log = logging.getLogger(__name__)

PVC_SOURCE = "persistentVolumeClaim"
EXISTING_SOURCE = "existingSource"
NEW_PVC = "newPvc"
MOUNT = "mount"
NAME = "name"


def check_volume_format(api_volume):
    """
    Ensure that the JSON object received has the expected structure.

    api_volume: The JSON API Volume object
    """
    if MOUNT not in api_volume:
        raise BadRequest("Volume should have a mount: %s" % api_volume)

    if EXISTING_SOURCE not in api_volume and NEW_PVC not in api_volume:
        raise BadRequest("Volume has neither %s nor %s: %s"
                         % (EXISTING_SOURCE, NEW_PVC, api_volume))

    if EXISTING_SOURCE in api_volume and NEW_PVC in api_volume:
        raise BadRequest("Volume has both %s and %s: %s"
                         % (EXISTING_SOURCE, NEW_PVC, api_volume))


def get_volume_name(api_volume):
    """
    Return the name of the K8s V1Volume given an API volume with an existing
    source.

    api_volume: The API Volume submitted from client/UI
    """
    # if the volume source is an existing PVC then use the requested PVC's name
    # as the V1Volume.name
    if EXISTING_SOURCE not in api_volume:
        raise BadRequest("Failed to retrieve a volume name from '%s'"
                         % api_volume)
    if PVC_SOURCE in api_volume[EXISTING_SOURCE]:
        if "claimName" not in api_volume[EXISTING_SOURCE][PVC_SOURCE]:
            raise BadRequest("Failed to retrieve the PVC name from '%s'"
                             % api_volume)
        return api_volume[EXISTING_SOURCE][PVC_SOURCE]["claimName"]

    # A user requested a different source for the V1Volume. In this case we
    # use a randomly generated name
    return "existing-source-volume-%s" % utils.random_string(8)


def get_pod_volume(api_volume, pvc):
    """
    Return a V1Volume dict object based on the API Volume the client/UI sent.

    api_volume: The API Volume submitted from client/UI
    pvc: The created PVC, whose spec was defined in the api_volume
    """
    check_volume_format(api_volume)

    if pvc is not None:
        # Mount a new PVC. We use the created PVC since the api_volume.newPvc
        # spec might have defined a metadata.generateName. In this case, the
        # name is set after the creation of the PVC
        return {"name": pvc.metadata.name,
                "persistentVolumeClaim": {"claimName": pvc.metadata.name}}

    # User has explicitly asked to use an existing volume source
    v1_volume = {"name": get_volume_name(api_volume)}
    v1_volume.update(api_volume[EXISTING_SOURCE])
    return v1_volume


def get_container_mount(api_volume, volume_name):
    """
    Return a V1VolumeMount dict object from the request's JSON API Volume

    api_volume: The API Volume submitted from client/UI
    volume_name: The name of the V1Volume which the mount should refer to
    """
    check_volume_format(api_volume)

    return {"name": volume_name, "mountPath": api_volume["mount"]}


def get_new_pvc(api_volume) -> client.V1PersistentVolumeClaim:
    """
    Return a V1PersistentVolumeClaim dict object from the request's JSON
    API Volume.

    api_volume: The JSON V1Volume object, in cammelCase as defined in the docs
    """
    check_volume_format(api_volume)
    if NEW_PVC not in api_volume:
        return None

    pvc = api.deserialize(api_volume[NEW_PVC], "V1PersistentVolumeClaim")

    # don't allow users to explicitly set the Namespace
    if pvc.metadata.namespace is not None:
        raise BadRequest("PVC should not specify the namespace.")

    return pvc


def add_notebook_volume(notebook, volume):
    """
    Add the provided podvolume (dict V1Volume) to the Notebook's PodSpec.

    notebook: Notebook CR dict
    volume: Podvolume dict
    """
    podspec = notebook["spec"]["template"]["spec"]
    if "volumes" not in podspec:
        podspec["volumes"] = []

    podspec["volumes"].append(volume)
    return notebook


def add_notebook_container_mount(notebook, container_mount):
    """
    Add the provided container mount (dict V1VolumeMount) to the Notebook's
    PodSpec.

    notebook: Notebook CR dict
    volume: Podvolume dict
    """
    container = notebook["spec"]["template"]["spec"]["containers"][0]
    if "volumeMounts" not in container:
        container["volumeMounts"] = []

    container["volumeMounts"].append(container_mount)
    return notebook

# Lance begin 20240907
def add_notebook_container_source_mount(notebook, container_mount):
    """
    Add the provided container mount (dict V1VolumeMount) to the Notebook's
    PodSpec.

    notebook: Notebook CR dict
    volume: Podvolume dict
    """
    container = notebook["spec"]["template"]["spec"]["containers"][1]
    if "volumeMounts" not in container:
        container["volumeMounts"] = []

    container["volumeMounts"].append(container_mount)
    return notebook
# Lance end 20240907
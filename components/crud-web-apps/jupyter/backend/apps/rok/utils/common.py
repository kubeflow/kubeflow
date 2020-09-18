import random
import string

from kubernetes import client


from ...common import utils


def random_string(size=9, chars=string.ascii_lowercase + string.digits):
    """Create a random string."""
    return "".join(random.choice(chars) for _ in range(size))


def rok_pvc_from_dict(vol, namespace):
    pvc = utils.pvc_from_dict(vol, namespace)
    pvc.metadata.name = "%s-%s" % (vol["name"], random_string())
    return pvc


def add_workspace_volume_annotations(pvc, vol):
    """
    Attach the needed annotation to the PVC k8s object
    """
    annotations = {"jupyter-workspace": vol["name"]}

    if vol["type"] == "Existing":
        annotations["rok/origin"] = vol["extraFields"].get("rokUrl", "")

    labels = {"component": "singleuser-storage"}

    pvc.metadata.annotations = annotations
    pvc.metadata.labels = labels


def add_data_volume_annotations(pvc, vol):
    annotations = {"jupyter-dataset": vol["name"]}

    if vol["type"] == "Existing":
        annotations["rok/origin"] = vol["extraFields"].get("rokUrl", "")

    labels = {"component": "singleuser-storage"}

    pvc.metadata.annotations = annotations
    pvc.metadata.labels = labels


def add_owner_reference(obj, nb):
    owner_reference = client.V1ObjectReference(
        api_version=nb["apiVersion"],
        kind=nb["kind"],
        name=nb["metadata"]["name"],
        uid=nb["metadata"]["uid"],
    )

    if not obj.metadata.owner_references:
        obj.metadata.owner_references = []
    obj.metadata.owner_references.append(owner_reference)

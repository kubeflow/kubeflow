from kubeflow.kubeflow.crud_backend import helpers
import os

KIND = "VolumeViewer"
GROUP = "volumeviewer.kubeflow.org"
VERSION = "v1alpha1"
PLURAL = "volumeviewers"
VIEWER = [GROUP, VERSION, PLURAL]

POD_VIEWER_NAME_LABEL = "viewer-name"

DEFAULT_VIEWER_IMAGE = "filebrowser/filebrowser:latest"

def create_viewer_template(name, namespace):
    """
    name: the name of the PVC for which the viewer is to be created
    namespace: the PVC's namespace

    Returns the body of the viewer as a dict 
    """

    return {
        "apiVersion": f"{GROUP}/{VERSION}",
        "kind": KIND,
        "metadata": {
            "name": name,
            "namespace": namespace,
        },
        "spec": {
            "pvcname": name,
            "viewerimage": os.environ.get("VOLUME_VIEWER_IMAGE", DEFAULT_VIEWER_IMAGE)
        }
    }


def is_viewer_pod(pod):
    """
    Returns True if the pod is a viewer pod, False otherwise.
    """
    return get_owning_viewer(pod) != None


def get_owning_viewer(pod):
    """
    Returns the viewer's name that owns the given pod.
    """
    try:
        return pod.metadata.labels.get(POD_VIEWER_NAME_LABEL, None)
    except AttributeError:
        return None

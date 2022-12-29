from kubeflow.kubeflow.crud_backend import helpers

KIND = "VolumeViewer"
GROUP = "volumeviewer.kubeflow.org"
VERSION = "v1alpha1"
PLURAL = "volumeviewers"
VIEWER = [GROUP, VERSION, PLURAL]

POD_VIEWER_NAME_LABEL = "viewer-name"

VIEWER_SPEC_PATH = "/etc/config/viewer.yaml"


def create_viewer_from_template(name, namespace):
    """
    name: the metadata.name of the viewer
    namespace: the metadata.namespace of the viewer

    Reads the yaml for the web app's custom resource, replaces the variables
    and returns it as a python dict.
    """

    viewer_spec = helpers.load_param_yaml(VIEWER_SPEC_PATH)

    return {
        "apiVersion": f"{GROUP}/{VERSION}",
        "kind": KIND,
        "metadata": {
            "name": name,
            "namespace": namespace,
        },
        "spec": viewer_spec
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

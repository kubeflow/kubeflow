from kubeflow.kubeflow.crud_backend import helpers
import os
import yaml
from string import Template

KIND = "PVCViewer"
GROUP = "kubeflow.org"
VERSION = "v1alpha1"
PLURAL = "pvcviewers"
VIEWER = [GROUP, VERSION, PLURAL]

VIEWER_SPEC_PATH = os.path.join("/etc/config", "viewer-spec.yaml")
POD_PARENT_VIEWER_LABEL_KEY = "app.kubernetes.io/name"

def create_viewer_template(name, namespace):
    """
    name: the name of the PVC for which the viewer is to be created
    namespace: the PVC's namespace

    Returns the body of the viewer as a dict 
    """

    with open(VIEWER_SPEC_PATH, "r") as f:
        viewer_template = yaml.safe_load(f) 

    variables = os.environ.copy()
    variables["PVC_NAME"] = name
    variables["NAMESPACE"] = namespace
    variables["NAME"] = name

    spec = _substitute_env_variables(viewer_template, variables)

    return {
        "apiVersion": f"{GROUP}/{VERSION}",
        "kind": KIND,
        "metadata": {
            "name": name,
            "namespace": namespace,
        },
        "spec": spec
    }


# Substitute environment variables
def _substitute_env_variables(data, variables):
    if isinstance(data, dict):
        for key, value in data.items():
            data[key] = _substitute_env_variables(value, variables)
    elif isinstance(data, list):
        for i, element in enumerate(data):
            data[i] = _substitute_env_variables(element, variables)
    elif isinstance(data, str):
        try:
            data = Template(data).substitute(**variables)
        except:
            pass
    return data


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
        return pod.metadata.labels.get(POD_PARENT_VIEWER_LABEL_KEY, None)
    except AttributeError:
        return None
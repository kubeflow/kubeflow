import json
from kubernetes import client, config
from kubernetes.config import ConfigException
from kubernetes.client.rest import ApiException
from . import auth
from . import utils

logger = utils.create_logger(__name__)

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


# Wrapper Functions for error handling
def wrap_resp(rsrc, fn, *args, **kwargs):
    '''
    rsrc: Name of the resource, used as the dict key
    fn: function to get the resource
    '''
    data = {
        "success": True,
        "log": ""
    }

    try:
        data[rsrc] = fn(*args, **kwargs)
    except ApiException as e:
        data[rsrc] = {}
        data["success"] = False
        data["log"] = parse_error(e)
    except Exception as e:
        data[rsrc] = {}
        data["success"] = False
        data["log"] = parse_error(e)

    return data


def wrap(fn, *args, **kwargs):
    '''
    fn: function to get the resource
    '''
    data = {
        "success": True,
        "log": ""
    }

    try:
        fn(*args, **kwargs)
    except ApiException as e:
        data["success"] = False
        data["log"] = parse_error(e)
    except Exception as e:
        data["success"] = False
        data["log"] = parse_error(e)

    return data


# API Functions
# GETers
@auth.needs_authorization("get", "core", "v1", "pvcs")
def get_pvcs(namespace):
    return wrap_resp(
        "pvcs",
        v1_core.list_namespaced_persistent_volume_claim,
        namespace=namespace
    )


@auth.needs_authorization("get", "core", "v1", "pods")
def get_pods(namespace):
    return wrap_resp(
        "pods",
        v1_core.list_namespaced_pod,
        namespace
    )


@auth.needs_authorization("get", "kubeflow.org", "v1beta1", "notebooks")
def get_notebooks(namespace):
    return wrap_resp(
        "notebooks",
        custom_api.list_namespaced_custom_object,
        "kubeflow.org",
        "v1beta1",
        namespace,
        "notebooks"
    )


@auth.needs_authorization("get", "kubeflow.org", "v1alpha1", "poddefaults")
def get_poddefaults(namespace):
    return wrap_resp(
        "poddefaults",
        custom_api.list_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        namespace,
        "poddefaults"
    )


@auth.needs_authorization("get", "core", "v1", "secrets")
def get_secret(namespace, name):
    return wrap_resp(
        "secret",
        v1_core.read_namespaced_secret,
        name,
        namespace
    )


@auth.needs_authorization("get", "core", "v1", "namespaces")
def get_namespaces():
    return wrap_resp(
        "namespaces",
        v1_core.list_namespace
    )


@auth.needs_authorization("get", "storage.k8s.io", "v1", "storageclasses")
def get_storageclasses():
    return wrap_resp(
        "storageclasses",
        storage_api.list_storage_class
    )


# POSTers
@auth.needs_authorization("post", "kubeflow.org", "v1beta1", "notebooks")
def post_notebook(namespace, notebook):
    return wrap(
        custom_api.create_namespaced_custom_object,
        "kubeflow.org",
        "v1beta1",
        namespace,
        "notebooks",
        notebook
    )


@auth.needs_authorization("post", "core", "v1", "pvcs")
def post_pvc(namespace, pvc):
    return wrap_resp(
        "pvc",
        v1_core.create_namespaced_persistent_volume_claim,
        namespace,
        pvc
    )


# DELETErs
@auth.needs_authorization("delete", "kubeflow.org", "v1beta1", "notebooks")
def delete_notebook(namespace, notebook_name):
    return wrap(
        custom_api.delete_namespaced_custom_object,
        "kubeflow.org",
        "v1beta1",
        namespace,
        "notebooks",
        notebook_name,
        client.V1DeleteOptions(propagation_policy="Foreground")
    )

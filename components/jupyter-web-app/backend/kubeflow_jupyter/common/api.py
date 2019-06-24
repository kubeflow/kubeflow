import json
from kubernetes import client, config
from kubernetes.config import ConfigException
from kubernetes.client.rest import ApiException
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
        data['success'] = False
        data['log'] = parse_error(e)
    except Exception as e:
        data[rsrc] = {}
        data['success'] = False
        data['log'] = parse_error(e)

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
        data['success'] = False
        data['log'] = parse_error(e)
    except Exception as e:
        data['success'] = False
        data['log'] = parse_error(e)

    return data


# API Functions
# GETers
def get_pvcs(ns):
    return wrap_resp(
        'pvcs',
        v1_core.list_namespaced_persistent_volume_claim, namespace=ns
    )


def get_pods(ns):
    return wrap_resp(
        'pods',
        v1_core.list_namespaced_pod, namespace=ns
    )


def get_notebooks(ns):
    return wrap_resp(
        'notebooks',
        custom_api.list_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        ns,
        "notebooks"
    )


def get_namespaces():
    return wrap_resp(
        'namespaces',
        v1_core.list_namespace
    )


def get_storageclasses():
    return wrap_resp(
        'storageclasses',
        storage_api.list_storage_class
    )


def get_secret(ns, nm):
    return wrap_resp(
        'secret',
        v1_core.read_namespaced_secret, nm, ns
    )


# POSTers
def post_svc(svc):
    return wrap(
        v1_core.create_namespaced_service,
        svc['metadata']['namespace'], svc,
    )


def post_notebook(notebook):
    return wrap(
        custom_api.create_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        notebook['metadata']['namespace'],
        "notebooks",
        notebook
    )


def post_pvc(pvc):
    return wrap_resp(
        'pvc',
        v1_core.create_namespaced_persistent_volume_claim,
        pvc.metadata.namespace, pvc
    )


# DELETEers
def delete_notebook(namespace, notebook_name):
    return wrap(
        custom_api.delete_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        namespace,
        "notebooks",
        notebook_name,
        client.V1DeleteOptions(propagation_policy="Foreground")
    )

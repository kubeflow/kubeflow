import json
import os
import requests
from kubernetes import client, config
from kubernetes.config import ConfigException
from kubernetes.client.rest import ApiException
from . import utils

logger = utils.create_logger(__name__)

KFAM = os.getenv("KFAM", "profiles-kfam.kubeflow.svc.cluster.local:8081")


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


def is_authorized(user, namespace):
    '''
    Queries KFAM for whether the provided user has access
    to the specific namespace
    '''
    if user is None:
        # In case a user is not present, preserve the behavior from 0.5
        # Pass the authorization check and make the calls with the webapp's SA
        return True

    try:
        resp = requests.get("http://{}/kfam/v1/bindings?namespace={}".format(
            KFAM, namespace)
        )
    except Exception as e:
        logger.warning("Error talking to KFAM: {}".format(parse_error(e)))
        return False

    if resp.status_code == 200:
        # Iterate through the namespace's bindings and check for the user
        for binding in resp.json().get("bindings", []):
            if binding["user"]["name"] == user:
                return True

        return False
    else:
        logger.warning("{}: Error talking to KFAM!".format(resp.status_code))
        return False


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
def get_pvcs(ns, user=None):
    if not is_authorized(user, ns):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, ns
            )
        }

    return wrap_resp(
        "pvcs",
        v1_core.list_namespaced_persistent_volume_claim, namespace=ns
    )


def get_pods(ns, user=None):
    if not is_authorized(user, ns):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, ns
            )
        }

    return wrap_resp(
        "pods",
        v1_core.list_namespaced_pod, namespace=ns
    )


def get_notebooks(ns, user=None):
    if not is_authorized(user, ns):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, ns
            )
        }

    return wrap_resp(
        "notebooks",
        custom_api.list_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        ns,
        "notebooks"
    )


def get_poddefaults(ns, user=None):
    if not is_authorized(user, ns):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, ns
            )
        }

    return wrap_resp(
        "poddefaults",
        custom_api.list_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        ns,
        "poddefaults"
    )


def get_namespaces(user=None):
    return wrap_resp(
        "namespaces",
        v1_core.list_namespace
    )


def get_storageclasses(user=None):
    return wrap_resp(
        "storageclasses",
        storage_api.list_storage_class
    )


def get_secret(ns, nm, user=None):
    if not is_authorized(user, ns):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, ns
            )
        }

    return wrap_resp(
        "secret",
        v1_core.read_namespaced_secret, nm, ns
    )


# POSTers
def post_notebook(notebook, user=None):
    if not is_authorized(user, notebook["metadata"]["namespace"]):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, notebook["metadata"]["namespace"]
            )
        }

    return wrap(
        custom_api.create_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        notebook["metadata"]["namespace"],
        "notebooks",
        notebook
    )


def post_pvc(pvc, user=None):
    if not is_authorized(user, pvc.metadata.namespace):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, pvc.metadata.namespace
            )
        }

    return wrap_resp(
        "pvc",
        v1_core.create_namespaced_persistent_volume_claim,
        pvc.metadata.namespace, pvc
    )


# DELETEers
def delete_notebook(namespace, notebook_name, user=None):
    if not is_authorized(user, namespace):
        return {
            "success": False,
            "log": "User '{}' is not authorized for namespace '{}'".format(
                user, namespace
            )
        }

    return wrap(
        custom_api.delete_namespaced_custom_object,
        "kubeflow.org",
        "v1alpha1",
        namespace,
        "notebooks",
        notebook_name,
        client.V1DeleteOptions(propagation_policy="Foreground")
    )

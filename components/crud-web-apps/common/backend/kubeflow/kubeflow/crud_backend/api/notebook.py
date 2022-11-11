import logging

from werkzeug import exceptions

from .. import authz
from . import custom_api, events, utils, watch

log = logging.getLogger(__name__)

# This object will be handle by the watch.py helpers completely. The dict has
# namespaces as keys. This is done for performance reasons, since most requests
# will be asking for namespaced data
#
# CACHE = {"namespace1": [...],
#          "namespace2": [...]}
CACHE = {}


def get_notebook(name, namespace):
    authz.ensure_authorized(
        "get", "kubeflow.org", "v1beta1", "notebooks", namespace
    )

    if not watch.should_use_cache(CACHE):
        return custom_api.get_namespaced_custom_object(
            "kubeflow.org", "v1beta1", namespace, "notebooks", name
        )

    # use data from the cache
    notebook = watch.get_namespaced_object(name, namespace, CACHE)
    if notebook is None:
        raise exceptions.NotFound("Notebook %s/%s is not found"
                                  % (namespace, name))
    return notebook


def create_notebook(notebook, namespace, dry_run=False):
    authz.ensure_authorized(
        "create", "kubeflow.org", "v1beta1", "notebooks", namespace
    )

    return custom_api.create_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "notebooks", notebook,
        dry_run="All" if dry_run else None)


def list_notebooks(namespace):
    authz.ensure_authorized(
        "list", "kubeflow.org", "v1beta1", "notebooks", namespace
    )

    if not watch.should_use_cache(CACHE):
        log.debug("Can't use the cache. Will send request to K8s.")
        return custom_api.list_namespaced_custom_object(
            "kubeflow.org", "v1beta1", namespace, "notebooks"
        )["items"]

    log.info("A watch is in place for Notebooks. Will use cached data.")
    return CACHE.get(namespace, [])


def delete_notebook(notebook, namespace):
    authz.ensure_authorized(
        "delete", "kubeflow.org", "v1beta1", "notebooks", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        group="kubeflow.org",
        version="v1beta1",
        namespace=namespace,
        plural="notebooks",
        name=notebook,
        propagation_policy="Foreground",
    )


def patch_notebook(notebook, namespace, body):
    authz.ensure_authorized(
        "patch", "kubeflow.org", "v1beta1", "notebooks", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "notebooks", notebook, body
    )


def list_notebook_events(notebook, namespace):

    field_selector = utils.events_field_selector("Notebook", notebook)

    return events.list_events(namespace, field_selector)


def list_notebooks_all_namespaces(*args, **kwargs):
    # This function should also be used when watching for CRs in all namespaces
    # https://github.com/kubernetes-client/python/issues/1750#issuecomment-1083606064
    return custom_api.list_cluster_custom_object(
        "kubeflow.org", "v1beta1", "notebooks", *args, **kwargs
    )


def watch_notebooks_all_namespaces():
    """Start a long running watch for Notebooks in all namespaces.

    This will setup an infinite retry loop. Should be used withing a long
    running greenlet.
    """
    watch.indefinitely(CACHE, list_notebooks_all_namespaces)

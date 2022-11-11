import logging

from .. import authz
from . import utils, v1_core, watch

log = logging.getLogger(__name__)

# This object will be handle by the watch.py helpers completely. The dict has
# namespaces as keys. This is done for performance reasons, since most requests
# will be asking for namespaced data
#
# CACHE = {"namespace1": [...],
#          "namespace2": [...]}
CACHE = {}


def list_pods(namespace, auth=True, label_selector=None):
    if auth:
        authz.ensure_authorized("list", "", "v1", "pods", namespace)

    if not watch.should_use_cache(CACHE):
        return v1_core.list_namespaced_pod(namespace=namespace,
                                           label_selector=label_selector).items

    log.info("A watch is in place for Pods. Will use cached data.")
    pods = CACHE.get(namespace, [])

    if label_selector is None:
        return pods

    # filter based on label_selector
    return [pod for pod in pods
            if utils.label_selector_matches(label_selector,
                                            pod.metadata.labels)]


def get_pod_logs(namespace, pod, container, auth=True):
    if auth:
        authz.ensure_authorized("get", "", "v1", "pods", namespace, "log")

    return v1_core.read_namespaced_pod_log(
        namespace=namespace, name=pod, container=container
    )


def watch_pods_all_namespaces():
    """Start a long running watch for Pods in all namespaces.

    This will setup an infinite retry loop. Should be used withing a long
    running greenlet.
    """
    watch.indefinitely(CACHE, v1_core.list_pod_for_all_namespaces)

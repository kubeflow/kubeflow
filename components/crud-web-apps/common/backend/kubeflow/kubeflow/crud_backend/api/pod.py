from .. import authz
from . import v1_core


def list_pods(namespace, auth=True, label_selector = None):
    if auth:
        authz.ensure_authorized("list", "", "v1", "pods", namespace)

    if label_selector is None:
        return v1_core.list_namespaced_pod(namespace)
    else:
        return v1_core.list_namespaced_pod(namespace = namespace, label_selector = label_selector)

def get_pod_logs(namespace, pod, container, auth=True):
    if auth:
        authz.ensure_authorized("read", "", "v1", "pods", namespace, "logs")

    return v1_core.read_namespaced_pod_log(
        namespace=namespace, name=pod, container=container
    )

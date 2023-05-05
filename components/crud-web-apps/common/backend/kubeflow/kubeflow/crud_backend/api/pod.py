from .. import authz
from . import v1_core


def list_pods(namespace, auth=True, label_selector = None):
    if auth:
        authz.ensure_authorized("list", "", "v1", "pods", namespace)

    return v1_core.list_namespaced_pod(namespace = namespace, label_selector = label_selector)

def get_pod_logs(namespace, pod, container, auth=True):
    if auth:
        authz.ensure_authorized("get", "", "v1", "pods", namespace, "log")

    return v1_core.read_namespaced_pod_log(
        namespace=namespace, name=pod, container=container
    )

def list_all_pods(field_selector: str):
    return v1_core.list_pod_for_all_namespaces(field_selector=field_selector)
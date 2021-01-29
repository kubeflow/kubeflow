from .. import authz
from . import v1_core


def list_pods(namespace, auth=True):
    if auth:
        authz.ensure_authorized("list", "", "v1", "pods", namespace)

    return v1_core.list_namespaced_pod(namespace)


def get_pod_logs(namespace, pod, container, auth=True):
    if auth:
        authz.ensure_authorized("read", "", "v1", "pods", namespace, "logs")

    return v1_core.read_namespaced_pod_log(
        namespace=namespace, name=pod, container=container
    )

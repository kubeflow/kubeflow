from .. import authz
from . import v1_core


def list_pods(namespace):
    authz.ensure_authorized("list", "", "v1", "pods", namespace)
    return v1_core.list_namespaced_pod(namespace)

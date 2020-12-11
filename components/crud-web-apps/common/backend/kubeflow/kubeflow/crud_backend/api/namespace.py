from .. import authz
from . import v1_core


@authz.needs_authorization("list", "core", "v1", "namespaces")
def list_namespaces():
    return v1_core.list_namespace()

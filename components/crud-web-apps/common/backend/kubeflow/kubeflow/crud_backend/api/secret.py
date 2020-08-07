from .. import authz
from . import v1_core


def get_secret(namespace, name, auth=True):
    if auth:
        authz.ensure_authorized("get", "", "v1", "secrets", namespace)

    return v1_core.read_namespaced_secret(name, namespace)


def create_secret(namespace, secret, auth=True):
    if auth:
        authz.ensure_authorized("create", "", "v1", "secrets", namespace)

    return v1_core.create_namespaced_secret(namespace, secret)

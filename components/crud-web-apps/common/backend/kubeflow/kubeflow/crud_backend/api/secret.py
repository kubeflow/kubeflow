from .. import authz
from . import v1_core


def get_secret(namespace, name, auth=True):
    if auth:
        authz.ensure_authorized("get", "", "v1", "secrets", namespace)

    return v1_core.read_namespaced_secret(name, namespace)

def list_secrets(namespace, auth=True):
    if auth:
        authz.ensure_authorized("list", "", "v1", "secrets", namespace)
    return v1_core.list_namespaced_secret(namespace)

def create_secret(namespace, secret, auth=True):
    if auth:
        authz.ensure_authorized("create", "", "v1", "secrets", namespace)

    return v1_core.create_namespaced_secret(namespace, secret)

def delete_secret(namespace, secret, auth=True):
    if auth:
        authz.ensure_authorized("delete", "", "v1", "secrets", namespace)

    return v1_core.delete_namespaced_secret(secret, namespace)

def patch_secret(name, namespace, secret, auth=True):
    if auth:
        authz.ensure_authorized("patch", "", "v1", "secrets", namespace)

    return v1_core.patch_namespaced_secret(name, namespace, secret)

def replace_secret(name, namespace, secret, auth=True):
    if auth:
        authz.ensure_authorized("patch", "", "v1", "secrets", namespace)

    return v1_core.replace_namespaced_secret(name, namespace, secret)

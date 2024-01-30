from .. import authz
from . import v1_core


def create_configmap(cmp, namespace, dry_run=False, auth=True):
    
    if auth:
        authz.ensure_authorized(
            "create", "", "v1", "configmaps", namespace
        )

    return v1_core.create_namespaced_config_map(
        namespace, cmp, dry_run="All" if dry_run else None)


def delete_configmap(cmap, namespace, auth=True):
    
    if auth:
        authz.ensure_authorized(
            "delete", "", "v1", "configmaps", namespace
        )
    return v1_core.delete_namespaced_config_map(cmap, namespace)


def list_configmaps(namespace, auth=True):
    
    if auth:
        authz.ensure_authorized(
            "list", "", "v1", "configmaps", namespace
        )
    return v1_core.list_namespaced_config_map(namespace)


def patch_configmap(name, namespace, cmap, auth=True):
    if auth:
        authz.ensure_authorized("patch", "", "v1", "configmaps",
                                namespace)

    return v1_core.patch_namespaced_config_map(name, namespace, cmap)

def replace_configmap(name, namespace, cmap, auth=True):
    if auth:
        authz.ensure_authorized("patch", "", "v1", "configmaps",
                                namespace)

    return v1_core.replace_namespaced_config_map(name, namespace, cmap)

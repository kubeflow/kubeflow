from .. import authz
from . import v1_core


def create_pvc(pvc, namespace, dry_run=False):
    authz.ensure_authorized(
        "create", "", "v1", "persistentvolumeclaims", namespace
    )

    return v1_core.create_namespaced_persistent_volume_claim(
        namespace, pvc, dry_run="All" if dry_run else None)


def delete_pvc(pvc, namespace):
    authz.ensure_authorized(
        "delete", "", "v1", "persistentvolumeclaims", namespace
    )
    return v1_core.delete_namespaced_persistent_volume_claim(pvc, namespace)


def list_pvcs(namespace):
    authz.ensure_authorized(
        "list", "", "v1", "persistentvolumeclaims", namespace
    )
    return v1_core.list_namespaced_persistent_volume_claim(namespace)

def get_pvc(pvc, namespace):
    authz.ensure_authorized(
        "get", "", "v1", "persistentvolumeclaims", namespace
    )
    return v1_core.read_namespaced_persistent_volume_claim(pvc, namespace)

def list_pvc_events(namespace, pvc_name):
    authz.ensure_authorized(
        "list", "", "v1", "events", namespace
    )

    field_selector = "involvedObject.kind=PersistentVolumeClaim,involvedObject.name=" + pvc_name
    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=field_selector
    )

def patch_pvc(name, namespace, pvc, auth=True):
    if auth:
        authz.ensure_authorized("patch", "", "v1", "persistentvolumeclaims",
                                namespace)

    return v1_core.patch_namespaced_persistent_volume_claim(name, namespace,
                                                            pvc)

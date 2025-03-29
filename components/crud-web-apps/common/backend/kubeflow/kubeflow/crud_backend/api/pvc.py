import logging

from werkzeug import exceptions

from .. import authz
from . import events, utils, v1_core, watch

log = logging.getLogger(__name__)

# This object will be handle by the watch.py helpers completely. The dict has
# namespaces as keys. This is done for performance reasons, since most requests
# will be asking for namespaced data
#
# CACHE = {"namespace1": [...],
#          "namespace2": [...]}
CACHE = {}
SELECTOR = "involvedObject.kind=PersistentVolumeClaim,involvedObject.name="


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

    if watch.should_use_cache(CACHE):
        log.info("A watch is in place for PVCs. Will use cached data.")
        return CACHE.get(namespace, [])

    return v1_core.list_namespaced_persistent_volume_claim(namespace).items


def get_pvc(name, namespace):
    authz.ensure_authorized(
        "get", "", "v1", "persistentvolumeclaims", namespace
    )

    if not watch.should_use_cache:
        return v1_core.read_namespaced_persistent_volume_claim(name, namespace)

    pvc = watch.get_namespaced_object(name, namespace, CACHE)
    if pvc is None:
        raise exceptions.NotFound("PVC %s/%s is not found" % namespace, name)

    return pvc


def list_pvc_events(namespace, pvc_name):
    field_selector = utils.events_field_selector("PersistentVolumeClaim",
                                                 pvc_name)
    return events.list_events(namespace, field_selector)


def patch_pvc(name, namespace, pvc, auth=True):
    if auth:
        authz.ensure_authorized("patch", "", "v1", "persistentvolumeclaims",
                                namespace)

    return v1_core.patch_namespaced_persistent_volume_claim(name, namespace,
                                                            pvc)


def watch_pvcs_all_namespaces():
    """Start a long running watch for PVCs in all namespaces.

    This will setup an infinite retry loop. Should be used withing a long
    running greenlet.
    """
    watch.indefinitely(CACHE,
                       v1_core.list_persistent_volume_claim_for_all_namespaces)

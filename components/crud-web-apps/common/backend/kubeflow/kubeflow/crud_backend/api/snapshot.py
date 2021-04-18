from kubernetes import client

from .. import authz
from . import custom_api, v1_core


def get_snapshot(snapshot, namespace):
    authz.ensure_authorized(
        "get", "snapshot.storage.k8s.io", "v1beta1",
        "volumesnapshots", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "snapshot.storage.k8s.io", "v1beta1",
        namespace, "volumesnapshots", snapshot
    )


def create_snapshot(snapshot, namespace):
    authz.ensure_authorized(
        "create", "snapshot.storage.k8s.io", "v1beta1",
        "volumesnapshots", namespace
    )
    return custom_api.create_namespaced_custom_object(
        "snapshot.storage.k8s.io", "v1beta1",
        namespace, "volumesnapshots", snapshot
    )


def list_snapshots(namespace):
    authz.ensure_authorized(
        "list", "snapshot.storage.k8s.io", "v1beta1",
        "volumesnapshots", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "snapshot.storage.k8s.io", "v1beta1",
        namespace, "volumesnapshots"
    )


def delete_snapshot(snapshot, namespace):
    authz.ensure_authorized(
        "delete", "snapshot.storage.k8s.io", "v1beta1",
        "volumesnapshots", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "snapshot.storage.k8s.io",
        "v1beta1",
        namespace,
        "volumesnapshots",
        snapshot,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def list_snapshot_events(snapshot, namespace):
    selector = "involvedObject.kind=VolumeSnapshot,involvedObject.name="
    + snapshot

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )

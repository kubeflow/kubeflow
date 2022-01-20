from kubernetes import client

from kubeflow.kubeflow.crud_backend import authz
from kubeflow.kubeflow.crud_backend.api import custom_api, v1_core


def get_bridge(bridge, namespace):
    authz.ensure_authorized(
        "get", "kafka.strimzi.io", "v1beta2", "kafkabridges", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkabridges", bridge
    )


def create_bridge(bridge, namespace):
    authz.ensure_authorized(
        "create", "kafka.strimzi.io", "v1beta2", "kafkabridges", namespace
    )
    return custom_api.create_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkabridges", bridge
    )


def list_bridges(namespace):
    authz.ensure_authorized(
        "list", "kafka.strimzi.io", "v1beta2", "kafkabridges", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkabridges"
    )


def delete_bridge(bridge, namespace):
    authz.ensure_authorized(
        "delete", "kafka.strimzi.io", "v1beta2", "kafkabridges", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "kafka.strimzi.io",
        "v1beta2",
        namespace,
        "kafkabridges",
        bridge,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def patch_bridge(bridge, namespace, body):
    authz.ensure_authorized(
        "patch", "kafka.strimzi.io", "v1beta2", "kafkabridges", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkabridges", bridge, body
    )


def list_bridge_events(bridge, namespace):
    selector = "involvedObject.kind=KafkaBridge,involvedObject.name=" + bridge

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )

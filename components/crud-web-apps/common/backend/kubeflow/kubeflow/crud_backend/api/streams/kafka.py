from kubernetes import client

from kubeflow.kubeflow.crud_backend import authz
from kubeflow.kubeflow.crud_backend.api import custom_api, v1_core


def get_kafka(kafka, namespace):
    authz.ensure_authorized(
        "get", "kafka.strimzi.io", "v1beta2", "kafkas", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas", kafka
    )


def create_kafka(kafka, namespace):
    authz.ensure_authorized(
        "create", "kafka.strimzi.io", "v1beta2", "kafkas", namespace
    )
    return custom_api.create_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas", kafka
    )


def list_kafka(namespace):
    authz.ensure_authorized(
        "list", "kafka.strimzi.io", "v1beta2", "kafkas", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas"
    )


def delete_kafka(kafka, namespace):
    authz.ensure_authorized(
        "delete", "kafka.strimzi.io", "v1beta2", "kafkas", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "kafka.strimzi.io",
        "v1beta2",
        namespace,
        "kafkas",
        kafka,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def patch_kafka(kafka, namespace, body):
    authz.ensure_authorized(
        "patch", "kafka.strimzi.io", "v1beta2", "kafkas", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas", kafka, body
    )


def list_kafka_events(kafka, namespace):
    selector = "involvedObject.kind=Kafka,involvedObject.name=" + kafka

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )

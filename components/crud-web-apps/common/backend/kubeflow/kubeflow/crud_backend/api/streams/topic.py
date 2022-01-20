from kubernetes import client

from kubeflow.kubeflow.crud_backend import authz
from kubeflow.kubeflow.crud_backend.api import custom_api, v1_core


def get_topic(topic, namespace):
    authz.ensure_authorized(
        "get", "kafka.strimzi.io", "v1beta2", "kafkatopics", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkatopics", topic
    )


def create_topic(topic, namespace):
    authz.ensure_authorized(
        "create", "kafka.strimzi.io", "v1beta2", "kafkatopics", namespace
    )
    return custom_api.create_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkatopics", topic
    )


def list_topics(namespace):
    authz.ensure_authorized(
        "list", "kafka.strimzi.io", "v1beta2", "kafkatopics", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkatopics"
    )


def delete_topic(topic, namespace):
    authz.ensure_authorized(
        "delete", "kafka.strimzi.io", "v1beta2", "kafkatopics", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "kafka.strimzi.io",
        "v1beta2",
        namespace,
        "kafkatopics",
        topic,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def patch_topic(topic, namespace, body):
    authz.ensure_authorized(
        "patch", "kafka.strimzi.io", "v1beta2", "kafkatopics", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkatopics", topic, body
    )


def list_topic_events(user, namespace):
    selector = "involvedObject.kind=KafkaTopic,involvedObject.name=" + user

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )

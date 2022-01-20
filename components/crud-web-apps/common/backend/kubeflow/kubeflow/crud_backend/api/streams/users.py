from kubernetes import client

from kubeflow.kubeflow.crud_backend import authz
from kubeflow.kubeflow.crud_backend.api import custom_api, v1_core


def get_user(user, namespace):
    authz.ensure_authorized(
        "get", "kafka.strimzi.io", "v1beta2", "kafkausers", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkausers", user
    )


def create_user(user, namespace):
    authz.ensure_authorized(
        "create", "kafka.strimzi.io", "v1beta2", "kafkausers", namespace
    )
    return custom_api.create_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkausers", user
    )


def list_users(namespace):
    authz.ensure_authorized(
        "list", "kafka.strimzi.io", "v1beta2", "kafkausers", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkausers"
    )


def delete_user(user, namespace):
    authz.ensure_authorized(
        "delete", "kafka.strimzi.io", "v1beta2", "kafkausers", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "kafka.strimzi.io",
        "v1beta2",
        namespace,
        "kafkausers",
        user,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def patch_user(user, namespace, body):
    authz.ensure_authorized(
        "patch", "kafka.strimzi.io", "v1beta2", "kafkausers", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkausers", user, body
    )


def list_user_events(user, namespace):
    selector = "involvedObject.kind=KafkaUser,involvedObject.name=" + user

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )

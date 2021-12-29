from kubernetes import client

from .. import authz
from . import custom_api, v1_core


def create_kafka_cluster(kafka, namespace):
    authz.ensure_authorized(
        "create", "kafka.strimzi.io", "v1beta2", "kafkas", namespace
    )

    return custom_api.create_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas", kafka
    )


def get_kafka(kafka, namespace):
    authz.ensure_authorized(
        "get", "kafka.strimzi.iog", "v1beta2", "kafkas", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas", kafka
    )


def list_kafkas(namespace):
    authz.ensure_authorized(
        "list", "kafka.strimzi.iog", "v1beta2", "kafkas", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "kafka.strimzi.io", "v1beta2", namespace, "kafkas"
    )
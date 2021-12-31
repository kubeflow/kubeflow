from flask import request
from kubeflow.kubeflow.crud_backend import api, decorators, helpers, logging

from . import bp
from ...common import form, utils

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/kafkas", methods=["GET"])
@decorators.request_is_json_type
@decorators.required_body_params("name")
def post_kafka_cluster(namespace):
    body = request.get_json()
    log.info("Got body: %s" % body)

    kafka_ephemeral = helpers.load_param_yaml(
        utils.KAFKA_EPHEMERAL,
        name=body["name"],
        namespace="namespace",
        # serviceAccount="default-editor",
    )
    # kafka_ephemeral_single = helpers.load_param_yaml(
    #     utils.KAFKA_EPHEMERAL_SINGLE,
    #     name=body["name"],
    #     namespace=namespace
    # )
    # kafka_persistent = helpers.load_param_yaml(
    #     utils.KAFKA_PERSISTENT,
    #     name=body["name"],
    #     namespace=namespace,
    #     kafkastoragesize=body["kafkastoragesize"],
    #     kafkazookeepersize=body["kafkazookeepersize"]
    # )
    # kafka_persistent_single = helpers.load_param_yaml(
    #     utils.KAFKA_PERSISTENT_SINGLE,
    #     name=body["name"],
    #     namespace=namespace,
    #     kafkastoragesize=body["kafkastoragesize"],
    #     kafkazookeepersize=body["kafkazookeepersize"]
    #
    # )

    # kafka_jbod = helpers.load_param_yaml()

    log.info("Creating Kafka Cluster: %s", kafka_ephemeral)
    api.create_kafka_cluster(kafka_ephemeral, namespace)
    return api.success_response("message", "Kafka Ephemeral Cluster created successfully.")

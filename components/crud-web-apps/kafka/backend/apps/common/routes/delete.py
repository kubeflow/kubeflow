from kubeflow.kubeflow.crud_backend import api, logging

from . import bp

log = logging.getLogger(__name__)

@bp.route(
    "/api/namespaces/<namespace>/notebooks/<notebook>", methods=["DELETE"]
)
def delete_kafka_cluster(kafka, namespace):
    log.info("Deleting  Kafka Cluster '%s/%s" % (namespace, kafka))
    api.delete_kafka_cluster(kafka, namespace)

    return api.success_response(
        "message", "Kafka Cluster %s successfully deleted." % kafka
    )
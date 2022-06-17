
from kubeflow.kubeflow.crud_backend import api, logging

from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configuration/<configuration>", methods=["DELETE"])
def delete_configuration(configuration, namespace):
    """
    Delete a Configuration only if it is not used from any Pod
    """

    log.info("Deleting Configuration %s/%s...", namespace, configuration)
    api.delete_poddefault(configuration, namespace)
    log.info("Successfully deleted Configuration %s/%s", namespace, configuration)

    return api.success_response("message",
                                "Configuration %s successfully deleted." % configuration)

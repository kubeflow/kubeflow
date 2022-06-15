from werkzeug import exceptions

from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils as common_utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/secret/<secret>", methods=["DELETE"])
def delete_secret(secret, namespace):
    """
    Delete a Secret only if it is not used from any Pod
    """
    # pods = common_utils.get_pods_using_secret(secret, namespace)
    # if pods:
    #     pod_names = [p.metadata.name for p in pods]
    #     raise exceptions.Conflict("Cannot delete Secret '%s' because it is being"
    #                               " used by pods: %s" % (secret, pod_names))

    log.info("Deleting Secret %s/%s...", namespace, secret)
    api.delete_secret(namespace, secret)
    log.info("Successfully deleted Secret %s/%s", namespace, secret)

    return api.success_response("message",
                                "Secret %s successfully deleted." % secret)

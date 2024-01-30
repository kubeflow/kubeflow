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

    log.info("Deleting Secret %s/%s...", namespace, secret)
    api.delete_secret(namespace, secret)
    log.info("Successfully deleted Secret %s/%s", namespace, secret)

    return api.success_response("message",
                                "Secret %s successfully deleted." % secret)

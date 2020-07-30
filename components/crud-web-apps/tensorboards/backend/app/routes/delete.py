from kubeflow.kubeflow.crud_backend import api, logging

from . import bp

log = logging.getLogger(__name__)


@bp.route(
    "/api/namespaces/<namespace>/tensorboards/<tensorboard>",
    methods=["DELETE"],
)
def delete_tensorboard(tensorboard, namespace):

    log.info("About to delete Tensorboard %s/%s", tensorboard, namespace)
    api.delete_custom_rsrc(
        "tensorboard.kubeflow.org",
        "v1alpha1",
        "tensorboards",
        tensorboard,
        namespace,
    )
    log.info(
        "DELETE request was sent to the API Server for Tensorboard: %s/%s",
        tensorboard,
        namespace,
    )

    return api.success_response("message", "Tensorboard deleted successfully.")

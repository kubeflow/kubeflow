from kubeflow.kubeflow.crud_backend import api, logging

from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configmap/<cmap>", methods=["DELETE"])
def delete_cmap(namespace, cmap):
    """
    Delete a ConfigMap only if it is not used from any Pod
    """

    log.info("Deleting ConfigMap %s/%s...", namespace, cmap)
    api.delete_configmap(cmap, namespace)
    log.info("Successfully deleted ConfigMap %s/%s", namespace, cmap)

    return api.success_response("message",
                                "ConfigMap %s successfully deleted." % cmap)

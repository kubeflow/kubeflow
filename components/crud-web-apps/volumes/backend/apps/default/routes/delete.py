from werkzeug import exceptions

from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils as common_utils
from ...common import viewer as viewer_utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc>", methods=["DELETE"])
def delete_pvc(pvc, namespace):
    """
    Delete a PVC only if it is not used from any Pod
    """
    pods = common_utils.get_pods_using_pvc(pvc, namespace)

    # Filter non viewer pods from viewer pods
    viewer_pods, non_viewer_pods = [], []
    for p in pods:
        viewer_pods.append(p) if viewer_utils.is_viewer_pod(
            p) else non_viewer_pods.append(p)

    # If any non viewer pod is using the PVC, raise an exception
    if non_viewer_pods:
        pod_names = [p.metadata.name for p in non_viewer_pods]
        raise exceptions.Conflict("Cannot delete PVC '%s' because it is being"
                                  " used by pods: %s" % (pvc, pod_names))

    # For each associated viewer pod delete its parent
    for viewer_pod in viewer_pods:
        viewer = viewer_utils.get_owning_viewer(viewer_pod)
        if not viewer:
            logging.warn(
                "Viewer pod %s/%s is missing the label value %s "
                "required to identify its parent",
                namespace,
                viewer_pod.metadata.name,
                viewer_utils.VIEWER_LABEL,
            )
        delete_viewer(viewer, namespace)

    log.info("Deleting PVC %s/%s...", namespace, pvc)
    api.delete_pvc(pvc, namespace)
    log.info("Successfully deleted PVC %s/%s", namespace, pvc)

    return api.success_response("message",
                                "PVC %s successfully deleted." % pvc)


@bp.route("/api/namespaces/<namespace>/viewers/<viewer>", methods=["DELETE"])
def delete_viewer(viewer, namespace):
    """
    Delete a viewer.
    """
    log.info("Deleting viewer %s/%s...", namespace, viewer)
    api.delete_custom_rsrc(*viewer_utils.VIEWER, viewer, namespace)
    log.info("Successfully deleted viewer %s/%s", namespace, viewer)

    return api.success_response("message",
                                "Viewer %s successfully deleted."
                                % viewer)

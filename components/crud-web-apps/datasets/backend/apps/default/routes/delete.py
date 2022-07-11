
from kubeflow.kubeflow.crud_backend import api, logging

from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/acceleratedatasets/<acceleratedataset>", methods=["DELETE"])
def delete_acceleratedataset(acceleratedataset, namespace):
    """
    Delete a Acceleratedataset only if it is not used from any Pod
    """
    
    print(acceleratedataset)

    log.info("Deleting AccelerateDatasets %s/%s...", namespace, acceleratedataset)
    api.delete_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "Dataset", acceleratedataset, namespace)
    # api.delete_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "JuiceFSRuntime", acceleratedataset, namespace)
    log.info("Successfully deleted AccelerateDatasets %s/%s", namespace, acceleratedataset)

    return api.success_response("message",
                                "AccelerateDatasets %s successfully deleted." % acceleratedataset)

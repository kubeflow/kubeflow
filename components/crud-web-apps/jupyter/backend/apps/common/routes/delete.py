from kubeflow.kubeflow.crud_backend import api, logging

from . import bp

log = logging.getLogger(__name__)


@bp.route(
    "/api/namespaces/<namespace>/notebooks/<notebook>", methods=["DELETE"]
)
def delete_notebook(notebook, namespace):
    log.info("Deleting Notebook '%s/%s'" % (namespace, notebook))
    api.delete_notebook(notebook, namespace)

    return api.success_response(
        "message", "Notebook %s successfully deleted." % notebook
    )


#2024/01/21 YCL delete authorizationpolicy start
@bp.route("/api/namespaces/<namespace>/aps_vnc/<name>", methods=["DELETE"])

def delete_authorization(name, namespace):
    api.delete_authorization(name, namespace)

    return api.success_response(
        "message", "Authorization %s successfully deleted." % name
    )
#2024/01/21 YCL delete authorizationpolicy end
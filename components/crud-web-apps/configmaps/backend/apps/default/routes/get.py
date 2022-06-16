from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configmaps")
def get_cmaps(namespace):
    # Return the list of ConfigMaps
    cmaps = api.list_configmaps(namespace)
    content = [utils.parse_configmap(cmap) for cmap in cmaps.items]

    return api.success_response("configMaps", content)

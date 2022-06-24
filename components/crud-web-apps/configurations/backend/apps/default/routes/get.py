from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configurations")
def get_configurations(namespace):
    # Return the list of Poddefault
    configurations = api.list_poddefaults(namespace)
    content = [utils.parse_poddefault(configuration) for configuration in configurations["items"]]

    return api.success_response("configurations", content)

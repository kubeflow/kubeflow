from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    # Return the list of PVCs
    pvcs = api.list_pvcs(namespace)
    notebooks = api.list_notebooks(namespace)["items"]
    content = [utils.parse_pvc(pvc, notebooks) for pvc in pvcs.items]

    return api.success_response("pvcs", content)


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>")
def get_pvc(namespace, pvc_name):
    pvc = api.get_pvc(pvc_name, namespace)
    return api.success_response("pvc", api.serialize(pvc))


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>/pods")
def get_pvc_pods(namespace, pvc_name):
    pods = utils.get_pods_using_pvc(pvc_name, namespace)

    return api.success_response("pods", api.serialize(pods))


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>/events")
def get_pvc_events(namespace, pvc_name):
    events = api.list_pvc_events(namespace, pvc_name).items

    return api.success_response("events", api.serialize(events))

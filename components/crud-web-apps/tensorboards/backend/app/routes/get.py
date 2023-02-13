from kubeflow.kubeflow.crud_backend import api, logging

from .. import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/tensorboards")
def get_tensorboards(namespace):

    tensorboards = api.list_custom_rsrc(
        "tensorboard.kubeflow.org", "v1alpha1", "tensorboards", namespace
    )
    content = [
        utils.parse_tensorboard(tensorboard)
        for tensorboard in tensorboards["items"]
    ]

    return api.success_response("tensorboards", content)


@bp.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    # Return the list of PVCs and the corresponding Viewer's state
    pvcs = api.list_pvcs(namespace)
    content = [pvc.metadata.name for pvc in pvcs.items]

    return api.success_response("pvcs", content)


@bp.route("/api/namespaces/<namespace>/poddefaults")
def get_poddefaults(namespace):
    pod_defaults = api.list_poddefaults(namespace)

    # Return a list of pod defaults adding custom fields (label, desc) for forms
    contents = []
    for pd in pod_defaults["items"]:
        label = list(pd["spec"]["selector"]["matchLabels"].keys())[0]
        if "desc" in pd["spec"]:
            desc = pd["spec"]["desc"]
        else:
            desc = pd["metadata"]["name"]

        pd["label"] = label
        pd["desc"] = desc
        contents.append(pd)

    log.info("Found poddefaults: %s", contents)

    return api.success_response("poddefaults", contents)

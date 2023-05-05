"""GET request handlers."""
from flask import request

from kubeflow.kubeflow.crud_backend import api, logging

from werkzeug.exceptions import NotFound

from .. import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/config")
def get_config():
    config = utils.load_spawner_ui_config()
    return api.success_response("config", config)


@bp.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    pvcs = api.list_pvcs(namespace).items
    data = [{"name": pvc.metadata.name,
             "size": pvc.spec.resources.requests["storage"],
             "mode": pvc.spec.access_modes[0]} for pvc in pvcs]

    return api.success_response("pvcs", data)


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


@bp.route("/api/namespaces/<namespace>/notebooks")
def get_notebooks(namespace):
    notebooks = api.list_notebooks(namespace)["items"]
    contents = [utils.notebook_dict_from_k8s_obj(nb) for nb in notebooks]

    return api.success_response("notebooks", contents)

@bp.route("/api/namespaces/<namespace>/notebooks/<name>")
def get_notebook(name, namespace):
    notebook = api.get_notebook(name, namespace)
    return api.success_response("notebook", notebook)

@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/pod")
def get_notebook_pod(notebook_name, namespace):
    label_selector = "notebook-name=" + notebook_name
    # There should be only one Pod for each Notebook,
    # so we expect items to have length = 1
    pods = api.list_pods(namespace = namespace, label_selector = label_selector)
    if pods.items:
        pod = pods.items[0]
        return api.success_response(
            "pod", api.serialize(pod),
        )
    else:
        raise NotFound("No pod detected.")




@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/pod/<pod_name>/logs")
def get_pod_logs(namespace, notebook_name, pod_name):
    container =  notebook_name
    logs = api.get_pod_logs(namespace, pod_name, container)
    return api.success_response(
        "logs", logs.split("\n"),
    )


@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/events")
def get_notebook_events(notebook_name, namespace):
    events = api.list_notebook_events(notebook_name, namespace).items

    return api.success_response(
        "events", api.serialize(events),
    )


@bp.route("/api/gpus")
def get_gpus_allocatable():
    """
    Return a list of GPU vendors with the corresponding allocatable GPUs.
    Since GPU on different nodes cannot be allocated together, for each vendor
    we take the maximum number available per node.
    """
    frontend_config = utils.load_spawner_ui_config()
    gpus_value = frontend_config.get("gpus", {}).get("value", {})
    config_vendor_keys = [
        v.get("limitsKey", "") for v in gpus_value.get("vendors", [])
    ]

    nodes = api.list_nodes().items
    gpu_configurations = {}
    for node in nodes:
        gpus_allocatable = {}
        for vendor in config_vendor_keys:
            gpus_allocatable[vendor] = int(node.status.allocatable.get(vendor, 0))

        # Get all the pods for a specific node
        pods = api.list_all_pods(field_selector='spec.nodeName=' + node.metadata.name).items

        # Listing over all containers
        for container in [container for pod in pods for container in pod.spec.containers if container.resources.limits]:
            # For each vendor we subtract the number of gpu specified as limit to the total capacity of the node
            for vendor in config_vendor_keys:
                gpus_allocatable[vendor] -= int(container.resources.limits.get(vendor, 0))

        # For each vendor, we set the maximum of gpu that can be used simultaneously
        for vendor, allocatable in gpus_allocatable.items():
            gpu_configurations[vendor] = max(allocatable, gpu_configurations.get(vendor, 0))

    return api.success_response("allocatable", gpu_configurations)

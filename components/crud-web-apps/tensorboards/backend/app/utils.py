from kubeflow.kubeflow.crud_backend import status
from werkzeug.exceptions import BadRequest


def parse_tensorboard(tensorboard):
    """
    Process the Tensorboard object and format it as the UI expects it.
    """
    if tensorboard.get("status", {}).get("readyReplicas", 0) == 1:
        phase = status.STATUS_PHASE.READY
        message = "The Tensorboard server is ready to connect"
    else:
        phase = status.STATUS_PHASE.UNAVAILABLE
        message = "The Tensorboard server is currently unavailble"

    parsed_tensorboard = {
        "name": tensorboard["metadata"]["name"],
        "namespace": tensorboard["metadata"]["namespace"],
        "logspath": tensorboard["spec"]["logspath"],
        "age": tensorboard["metadata"]["creationTimestamp"],
        "status": status.create_status(phase, message, "")
    }

    return parsed_tensorboard


def get_tensorboard_dict(namespace, body):
    """
    Create Tensorboard object from request body and format it as a Python dict.
    """
    requests, limits = tensorboard_resources(body)

    tensorboard = {
        "apiVersion": "tensorboard.kubeflow.org/v1alpha1",
        "kind": "Tensorboard",
        "metadata": {"name": body["name"], "namespace": namespace, },
        "spec": {
            "logspath": body["logspath"],
            "resources": {
                "requests": requests,
                "limits": limits
            }
        },
    }

    return tensorboard

def tensorboard_resources(body):
    """
    Get cpu,memory requests from body and calculate limits based on limit factor
    """

    cpu_limit_factor = 1.2
    memory_limit_factor = 1.2
    requests = {}
    limits = {}

    requests['cpu'] = body.get("cpu", None)
    if not requests['cpu'] or 'nan' in requests['cpu'].lower():
        raise BadRequest("Invalid value for cpu: %s" % requests['cpu'])

    limits['cpu'] = str(round((float(requests['cpu']) * float(cpu_limit_factor)), 1))

    requests['memory'] = body.get("memory", None)
    if not requests['memory'] or 'nan' in requests['memory'].lower():
        raise BadRequest("Invalid value for memory: %s" % requests['memory'])

    limits['memory'] = str(
        round((
            float(requests['memory'].replace('Gi', '')) * float(
                memory_limit_factor)), 1)) + "Gi"

    return requests, limits

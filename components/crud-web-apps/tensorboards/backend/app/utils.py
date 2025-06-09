from .status import process_status
from werkzeug.exceptions import BadRequest


def parse_tensorboard(tensorboard):
    """
    Process the Tensorboard object and format it as the UI expects it.
    """
    return {
        "name": tensorboard["metadata"]["name"],
        "namespace": tensorboard["metadata"]["namespace"],
        "logspath": tensorboard["spec"]["logspath"],
        "age": tensorboard["metadata"]["creationTimestamp"],
        "status": process_status(tensorboard)
    }


def get_tensorboard_dict(namespace, body):
    """
    Create Tensorboard object from request body and format it as a Python dict.
    """
    metadata = {
        "name": body["name"],
        "namespace": namespace,
    }
    labels = get_tensorboard_configurations(body=body)
    if labels:
        metadata["labels"] = labels

    tensorboard = {
        "apiVersion": "tensorboard.kubeflow.org/v1alpha1",
        "kind": "Tensorboard",
        "metadata": metadata,
        "spec": {"logspath": body["logspath"]},
    }

    return tensorboard


def get_tensorboard_configurations(body):
    labels = body.get("configurations", None)
    cr_labels = {}

    if not isinstance(labels, list):
        raise BadRequest("Labels for PodDefaults are not list: %s" % labels)

    for label in labels:
        cr_labels[label] = "true"

    return cr_labels

from kubeflow.kubeflow.crud_backend import helpers


def parse_tensorboard(tensorboard):
    """
    Process the Tensorboard object and format it as the UI expects it.
    """

    parsed_tensorboard = {
        "name": tensorboard["metadata"]["name"],
        "namespace": tensorboard["metadata"]["namespace"],
        "logspath": tensorboard["spec"]["logspath"],
        "age": helpers.get_age(tensorboard),
    }

    return parsed_tensorboard


def get_tensorboard_dict(namespace, body):
    """
    Create Tensorboard object from request body and format it as a Python dict.
    """

    tensorboard = {
        "apiVersion": "tensorboard.kubeflow.org/v1alpha1",
        "kind": "Tensorboard",
        "metadata": {"name": body["name"], "namespace": namespace, },
        "spec": {"logspath": body["logspath"], },
    }

    return tensorboard

from kubeflow.kubeflow.crud_backend import helpers


def parse_tensorboard(tensorboard):
    """
    Process the Tensorboard object and format it as the UI expects it.
    """
    
    if tensorboard.get("status", {}).get("readyReplicas", 0) == 1: 
        phase = "ready"
        message = "The Tensorboard server is ready to connect"
    else:
        phase = "unavailable"
        message = "The Tensorboard server is currently unavailble"

    parsed_tensorboard = {
        "name": tensorboard["metadata"]["name"],
        "namespace": tensorboard["metadata"]["namespace"],
        "logspath": tensorboard["spec"]["logspath"],
        "age": helpers.get_age(tensorboard),
        "status": {
            "phase": phase,
            "message": message, 
        }
    }

    return parsed_tensorboard

def getPVCName(pvc):
    """
    Return name of given PVC.
    """

    return pvc.metadata.name


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

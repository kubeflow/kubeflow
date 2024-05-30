import datetime as dt

from kubeflow.kubeflow.crud_backend import status

EVENT_TYPE_WARNING = "Warning"
STOP_ANNOTATION = "kubeflow-resource-stopped"


def process_status(tensorboard):
    """
    Return status and reason. Status may be [ready|waiting|warning|terminating|stopped]
    """
    # In case the Tb has no status
    status_phase, status_message = get_empty_status(tensorboard)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case the Tb is being stopped
    status_phase, status_message = get_stopped_status(tensorboard)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case the Tb is being deleted
    status_phase, status_message = get_deleted_status(tensorboard)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case the Tb is ready
    status_phase, status_message = check_ready_tb(tensorboard)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # Extract information about the status from the conditions of the Tb's status
    status_phase, status_message = get_status_from_conditions(tensorboard)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case there no status available, show a generic message
    status_phase, status_message = status.STATUS_PHASE.WARNING, "Couldn't find any information for the status of this tensorboard."
    return status.create_status(status_phase, status_message)


def get_empty_status(tensorboard):
    creation_timestamp = tensorboard["metadata"]["creationTimestamp"]
    conditions = tensorboard["status"]["conditions"]

    # Convert a date string of a format to datetime object
    tb_creation_time = dt.datetime.strptime(
        creation_timestamp, "%Y-%m-%dT%H:%M:%SZ")
    current_time = dt.datetime.utcnow().replace(microsecond=0)
    delta = (current_time - tb_creation_time)

    # If the tensorbord has no status, the status will be waiting (instead of warning) and we will
    # show a generic message for the first 10 seconds
    if not conditions and delta.total_seconds() <= 10:
        status_phase, status_message = status.STATUS_PHASE.WAITING, "Waiting for deployment to create the underlying Pod."
        return status_phase, status_message

    return None, None


def get_stopped_status(tensorboard):
    ready_replicas = tensorboard.get("status", {}).get("readyReplicas", 0)
    metadata = tensorboard.get("metadata", {})
    annotations = metadata.get("annotations", {})

    if STOP_ANNOTATION in annotations:
        # If the tensorboard is stopped, the status will be stopped
        if ready_replicas == 0:
            status_phase, status_message = status.STATUS_PHASE.STOPPED, "No Pods are currently running for this tensorboard."
            return status_phase, status_message
        # If the tensorboard is being stopped, the status will be waiting
        else:
            status_phase, status_message = status.STATUS_PHASE.WAITING, "Tensorboard is stopping."
            return status_phase, status_message

    return None, None


def get_deleted_status(tensorboard):
    metadata = tensorboard.get("metadata", {})

    # If the tensorboard is being deleted, the status will be terminating
    if "deletionTimestamp" in metadata:
        status_phase, status_message = status.STATUS_PHASE.TERMINATING, "Deleting this tensorboard."
        return status_phase, status_message

    return None, None


def check_ready_tb(tensorboard):
    ready_replicas = tensorboard.get("status", {}).get("readyReplicas", 0)

    # If the tensorboard is running, the status will be ready
    if ready_replicas == 1:
        status_phase, status_message = status.STATUS_PHASE.READY, "Running"
        return status_phase, status_message

    return None, None


def get_status_from_conditions(tensorboard):
    conditions = tensorboard.get("status", {}).get("conditions", [])

    for condition in conditions:
        # The status will be warning with a "reason: message" showing on hover
        if "reason" in condition:
            status_phase, status_message = status.STATUS_PHASE.WARNING, condition[
                "reason"] + ': ' + condition["message"]
            return status_phase, status_message

    return None, None
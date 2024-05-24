import datetime as dt

from kubeflow.kubeflow.crud_backend import api, status

EVENT_TYPE_WARNING = "Warning"
STOP_ANNOTATION = "kubeflow-resource-stopped"


def process_status(notebook):
    """
    Return status and reason. Status may be:
    [ready|waiting|warning|terminating|stopped]
    """
    # In case the Notebook has no status
    status_phase, status_message = get_empty_status(notebook)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case the Notebook is being stopped
    status_phase, status_message = get_stopped_status(notebook)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case the Notebook is being deleted
    status_phase, status_message = get_deleted_status(notebook)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # In case the Notebook is ready
    status_phase, status_message = check_ready_nb(notebook)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # Extract information about the status from the containerState of the
    # Notebook's status
    status_phase, status_message = get_status_from_container_state(notebook)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # Extract information about the status from the conditions of the
    # Notebook's status
    status_phase, status_message = get_status_from_conditions(notebook)
    if status_phase is not None:
        return status.create_status(status_phase, status_message)

    # Try to extract information about why the notebook is not starting
    # from the notebook's events (see find_error_event)
    notebook_events = get_notebook_events(notebook)
    status_event, reason_event = get_status_from_events(notebook_events)
    if status_event is not None:
        status_phase, status_message = status_event, reason_event

    # In case there no Events available, show a generic message
    status_phase = status.STATUS_PHASE.WARNING
    status_message = "Couldn't find any information for the status of this notebook."  # noqa: E501

    return status.create_status(status_phase, status_message)


def get_empty_status(notebook):
    creation_timestamp = notebook.get("metadata", {}).get("creationTimestamp")
    notebook_status = notebook.get("status", {})
    container_state = notebook_status.get("containerState")
    conditions = notebook_status.get("conditions")

    # Convert a date string of a format to datetime object
    nb_creation_time = dt.datetime.strptime(
        creation_timestamp, "%Y-%m-%dT%H:%M:%SZ")
    current_time = dt.datetime.utcnow().replace(microsecond=0)
    delta = (current_time - nb_creation_time)

    # If the Notebook has no status, the status will be waiting
    # (instead of warning) and we will show a generic message for the first 10
    # seconds
    if not container_state and not conditions and delta.total_seconds() <= 10:
        status_phase = status.STATUS_PHASE.WAITING
        status_message = "Waiting for StatefulSet to create the underlying Pod."  # noqa: E501
        return status_phase, status_message

    return None, None


def get_stopped_status(notebook):
    ready_replicas = notebook.get("status", {}).get("readyReplicas", 0)
    metadata = notebook.get("metadata", {})
    annotations = metadata.get("annotations", {})

    if STOP_ANNOTATION in annotations:
        # If the Notebook is stopped, the status will be stopped
        if ready_replicas == 0:
            status_phase = status.STATUS_PHASE.STOPPED
            status_message = "No Pods are currently running for this Notebook Server."  # noqa: E501
            return status_phase, status_message
        # If the Notebook is being stopped, the status will be waiting
        else:
            status_phase = status.STATUS_PHASE.WAITING
            status_message = "Notebook Server is stopping."
            return status_phase, status_message

    return None, None


def get_deleted_status(notebook):
    metadata = notebook.get("metadata", {})

    # If the Notebook is being deleted, the status will be terminating
    if "deletionTimestamp" in metadata:
        status_phase = status.STATUS_PHASE.TERMINATING
        status_message = "Deleting this Notebook Server."
        return status_phase, status_message

    return None, None


def check_ready_nb(notebook):
    ready_replicas = notebook.get("status", {}).get("readyReplicas", 0)

    # If the Notebook is running, the status will be ready
    if ready_replicas == 1:
        status_phase, status_message = status.STATUS_PHASE.READY, "Running"
        return status_phase, status_message

    return None, None


def get_status_from_container_state(notebook):
    # https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-states
    container_state = notebook.get("status", {}).get("containerState", {})

    if "waiting" not in container_state:
        return None, None

    # If the Notebook is initializing, the status will be waiting
    waiting_state = container_state["waiting"]
    if ["reason"] == 'PodInitializing':
        status_phase = status.STATUS_PHASE.WAITING
        status_message = waiting_state.get("reason", "Undetermined reason.")
        return status_phase, status_message

    # In any other case, the status will be warning with a "reason:
    # message" showing on hover
    else:
        status_phase = status.STATUS_PHASE.WARNING

        reason = waiting_state.get("reason", "Undefined")
        message = waiting_state.get(
            "message",
            "No available message for container state."
        )
        status_message = '%s: %s' % (reason, message)
        return status_phase, status_message


def get_status_from_conditions(notebook):
    conditions = notebook.get("status", {}).get("conditions", [])

    for condition in conditions:
        # The status will be warning with a "reason: message" showing on hover
        if "reason" in condition:
            status_phase = status.STATUS_PHASE.WARNING
            status_message = condition["reason"] + ': ' + condition["message"]
            return status_phase, status_message

    return None, None


def get_notebook_events(notebook):
    name = notebook["metadata"]["name"]
    namespace = notebook["metadata"]["namespace"]

    nb_creation_time = dt.datetime.strptime(
        notebook["metadata"]["creationTimestamp"], "%Y-%m-%dT%H:%M:%SZ"
    )

    nb_events = api.list_notebook_events(name, namespace).items
    # User can delete and then create a nb server with the same name
    # Make sure previous events are not taken into account
    nb_events = filter(
        lambda e: event_timestamp(e) >= nb_creation_time, nb_events,
    )

    return nb_events


def get_status_from_events(notebook_events):
    """
    Returns status and reason from the latest event that surfaces the cause
    of why the resource could not be created. For a Notebook, it can be due to:

          EVENT_TYPE      EVENT_REASON      DESCRIPTION
          Warning         FailedCreate      pods "x" is forbidden: error
            looking up service account ... (originated in statefulset)
          Warning         FailedScheduling  0/1 nodes are available: 1
            Insufficient cpu (originated in pod)

    """
    for e in sorted(notebook_events, key=event_timestamp, reverse=True):
        if e.type == EVENT_TYPE_WARNING:
            return status.STATUS_PHASE.WARNING, e.message

    return None, None


def event_timestamp(event):
    return event.metadata.creation_timestamp.replace(tzinfo=None)

import datetime as dt

from kubeflow.kubeflow.crud_backend import api, status

EVENT_TYPE_WARNING = "Warning"
STOP_ANNOTATION = "kubeflow-resource-stopped"


def process_status(notebook):
    """
    Return status and reason. Status may be [running|waiting|warning]
    """
    readyReplicas = notebook.get("status", {}).get("readyReplicas", 0)
    creationTimestamp = notebook["metadata"]["creationTimestamp"]

    # Convert a date string of a format to datetime object
    nb_creation_time = dt.datetime.strptime(
        creationTimestamp, "%Y-%m-%dT%H:%M:%SZ")
    current_time = dt.datetime.utcnow().replace(microsecond=0)
    delta = (current_time - nb_creation_time)

    while delta.total_seconds() <= 10:
        status_val, reason = status.STATUS_PHASE.WAITING, "Waiting for StatefulSet to create the underlying Pod."

        # Check if the Notebook is stopped or deleted
        status_phase, status_message = check_stopped_deleted_nb(notebook)
        if status_phase is not None:
            status_val, reason = status_phase, status_message

        return status.create_status(status_val, reason)
    else:
        # Check if the Notebook is stopped or deleted
        status_phase, status_message = check_stopped_deleted_nb(notebook)
        if status_phase is not None:
            status_val, reason = status_phase, status_message
            return status.create_status(status_val, reason)

        # If the Notebook is running, the status will be ready
        if readyReplicas == 1:
            return status.create_status(status.STATUS_PHASE.READY, "Running")

        # Otherwise, first check .status.containerState to determine the status
        # reason and message to determine the status
        containerState = notebook.get("status", {}).get("containerState", "")

        if "waiting" in containerState:
            if containerState["waiting"]["reason"] == 'PodInitializing':
                return status.create_status(
                    status.STATUS_PHASE.WAITING, containerState["waiting"]["reason"]
                )
            else:
                return status.create_status(
                    status.STATUS_PHASE.WARNING, containerState["waiting"]["reason"] +
                    ': ' + containerState["waiting"]["message"]
                )

        # If no containerState is available, check .status.conditions, since they have
        # a reason and a message to determine the status
        conditions = notebook.get("status", {}).get("conditions", "")

        for condition in conditions:
            for item in condition:
                if "reason" in item:
                    return status.create_status(
                        status.STATUS_PHASE.WARNING, condition["reason"] +
                        ': ' + condition["message"]
                    )

        # If no container state is available, we try to extract information
        # about why the notebook is not starting from the notebook's events
        # (see find_error_event)
        notebook_events = get_notebook_events(notebook)
        # In case there no Events available, show a generic message to the user
        status_val, reason = status.STATUS_PHASE.WARNING, "Couldn't find any information for the status of this notebook."
        status_event, reason_event = find_error_event(notebook_events)
        if status_event is not None:
            status_val, reason = status_event, reason_event

        return status.create_status(status_val, reason)


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


def find_error_event(notebook_events):
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


def check_stopped_deleted_nb(notebook):
    readyReplicas = notebook.get("status", {}).get("readyReplicas", 0)
    metadata = notebook.get("metadata", {})
    annotations = metadata.get("annotations", {})

    # Check if the Notebook is stopped
    if STOP_ANNOTATION in annotations:
        if readyReplicas == 0:
            return status.STATUS_PHASE.STOPPED, "No Pods are currently running for this Notebook Server."
        else:
            return status.STATUS_PHASE.WAITING, "Notebook Server is stopping."

    # If the Notebook is being deleted, the status will be waiting
    if "deletionTimestamp" in metadata:
        return status.STATUS_PHASE.TERMINATING, "Deleting this notebook server."

    return None, None

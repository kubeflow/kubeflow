import datetime as dt

from kubeflow.kubeflow.crud_backend import api, status

EVENT_TYPE_WARNING = "Warning"
STOP_ANNOTATION = "kubeflow-resource-stopped"


def process_status(notebook):
    """
    Return status and reason. Status may be [running|waiting|warning|error]
    """
    # Check if the Notebook is stopped
    readyReplicas = notebook.get("status", {}).get("readyReplicas", 0)
    metadata = notebook.get("metadata", {})
    annotations = metadata.get("annotations", {})

    if STOP_ANNOTATION in annotations:
        if readyReplicas == 0:
            return status.create_status(
                status.STATUS_PHASE.STOPPED,
                "No Pods are currently running for this Notebook Server.",
            )
        else:
            return status.create_status(
                status.STATUS_PHASE.TERMINATING, "Notebook Server is stopping."
            )

    # If the Notebook is being deleted, the status will be waiting
    if "deletionTimestamp" in metadata:
        return status.create_status(
            status.STATUS_PHASE.TERMINATING, "Deleting this notebook server"
        )

    # Check the status
    state = notebook.get("status", {}).get("containerState", "")

    # Use conditions on the Jupyter notebook (i.e., s) to determine overall
    # status. If no container state is available, we try to extract information
    # about why the notebook is not starting from the notebook's events
    # (see find_error_event)
    if readyReplicas == 1:
        return status.create_status(status.STATUS_PHASE.READY, "Running")

    if "waiting" in state:
        return status.create_status(
            status.STATUS_PHASE.WAITING, state["waiting"]["reason"]
        )

    # Provide the user with detailed information (if any) about
    # why the notebook is not starting
    notebook_events = get_notebook_events(notebook)
    status_val, reason = status.STATUS_PHASE.WAITING, "Scheduling the Pod"
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
            return status.STATUS_PHASE.WAITING, e.message

    return None, None


def event_timestamp(event):
    return event.metadata.creation_timestamp.replace(tzinfo=None)

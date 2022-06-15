from kubeflow.kubeflow.crud_backend import api, status


def secret_status(secret):
    """
    Set the status of the secret
    """
    if secret.metadata.deletion_timestamp is not None:
        return status.create_status(status.STATUS_PHASE.TERMINATING,
                                    "Deleting Secret...")

    if secret.status.phase == "Bound":
        return status.create_status(status.STATUS_PHASE.READY, "Bound")

    # The Secret is in Pending state, we check the Events to find out why
    evs = api.v1_core.list_namespaced_event(
        namespace=secret.metadata.namespace,
        field_selector=api.events_field_selector(
            "PersistentVolumeClaim", secret.metadata.name
        ),
    ).items

    # If there are no events, then the Secret was just created
    if len(evs) == 0:
        return status.create_status(status.STATUS_PHASE.WAITING,
                                    "Provisioning Secret...")

    msg = f"Pending: {evs[0].message}"
    state = evs[0].reason
    if evs[0].reason == "WaitForFirstConsumer":
        phase = status.STATUS_PHASE.UNAVAILABLE
        msg = (
            "Pending: This volume will be bound when its first consumer"
            " is created. E.g., when you first browse its contents, or"
            " attach it to a notebook server"
        )
    elif evs[0].reason == "Provisioning":
        phase = status.STATUS_PHASE.WAITING
    elif evs[0].reason == "FailedBinding":
        phase = status.STATUS_PHASE.WARNING
    elif evs[0].type == "Warning":
        phase = status.STATUS_PHASE.WARNING
    elif evs[0].type == "Normal":
        phase = status.STATUS_PHASE.READY

    return status.create_status(phase, msg, state)


def viewer_status(viewer):
    """
    Return a string representing the status of that viewer. If a deletion
    timestamp is set we want to return a `Terminating` state.
    """
    try:
        ready = viewer["status"]["ready"]
    except KeyError:
        return status.STATUS_PHASE.UNINITIALIZED

    if "deletionTimestamp" in viewer["metadata"]:
        return status.STATUS_PHASE.TERMINATING

    if not ready:
        return status.STATUS_PHASE.WAITING

    return status.STATUS_PHASE.READY

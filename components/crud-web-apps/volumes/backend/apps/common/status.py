from kubeflow.kubeflow.crud_backend import api, status


def pvc_status(pvc):
    """
    Set the status of the pvc
    """
    if pvc.metadata.deletion_timestamp is not None:
        return status.create_status(
            status.STATUS_PHASE.TERMINATING,
            "Deleting Volume...",
            key={
                "key": "volume.backend.status.volumeDeleting",
                "params": None
            }
        )

    if pvc.status.phase == "Bound":
        return status.create_status(
            status.STATUS_PHASE.READY,
            "Bound",
            key={
                "key": "volume.backend.status.bound",
                "params": None
            }
        )

        # The PVC is in Pending state, we check the Events to find out why
    evs = api.v1_core.list_namespaced_event(
        namespace=pvc.metadata.namespace,
        field_selector=api.events_field_selector(
            "PersistentVolumeClaim", pvc.metadata.name
        ),
    ).items

    # If there are no events, then the PVC was just created
    if len(evs) == 0:
        return status.create_status(
            status.STATUS_PHASE.WAITING,
            "Provisioning Volume...",
            key={
                "key": "volume.backend.status.volumeProvisioning",
                "params": None
            }
        )

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

    return status.create_status(
        phase,
        msg,
        state,
        key={
            "key": "volume.backend.status.unavailableStatus",
            "params": None
        }
    )


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

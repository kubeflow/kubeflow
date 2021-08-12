class STATUS_PHASE:
    """
    Different values that the status phase should have. The frontend will be
    expecting only these values.
    """

    READY = "ready"
    WAITING = "waiting"
    WARNING = "warning"
    ERROR = "error"
    UNINITIALIZED = "uninitialized"
    UNAVAILABLE = "unavailable"
    TERMINATING = "terminating"
    STOPPED = "stopped"


def create_status(phase="", message="", state="", key=None):
    return {
        "phase": phase,
        "message": message,
        "state": state,
    }

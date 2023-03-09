from .. import authz
from . import v1_core


def list_events(namespace, field_selector):
    authz.ensure_authorized(
        "list", "", "v1", "events", namespace
    )

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=field_selector
    )

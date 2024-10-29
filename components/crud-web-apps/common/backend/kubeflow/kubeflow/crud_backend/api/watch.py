import logging
import traceback

from kubernetes import client, watch

api = client.ApiClient()
log = logging.getLogger(__name__)


WATCH_CACHE = {}
CACHE_INIT_KEY = ".initialized"


def clear_cache(cache):
    """Reset the cache dict. Set necessery metadata fields as well."""
    cache.clear()
    cache[CACHE_INIT_KEY] = False


def should_use_cache(cache):
    """Checks whether the cache is valid and initialized."""
    return cache and cache.get(CACHE_INIT_KEY, False)


def get_namespaced_object(name, namespace, cache):
    """
    Search the cache for the namespaced object. Return None if not found.
    """
    for item in cache.get(namespace, []):
        if get_metadata_name(item) == name:
            return item

    return None

# In case of CustomResources the data is just a Dict object. In case of
# builtin objects, like Pods, PVCs etc, the objects are of a specific class.


def get_metadata_name(item):
    """Return the metadata.name of either a JSON or class object."""
    if hasattr(item, "metadata"):
        return item.metadata.name
    elif isinstance(item, dict):
        return item["metadata"]["name"]


def get_metadata_namespace(item):
    """Return the metadata.namespace of either a JSON or class object."""
    if hasattr(item, "metadata"):
        return item.metadata.namespace
    elif isinstance(item, dict):
        return item["metadata"]["namespace"]


def get_metadata_uid(item):
    """Return the metadata.uid of either a JSON or class object."""
    if hasattr(item, "metadata"):
        return item.metadata.uid
    elif isinstance(item, dict):
        return item["metadata"]["uid"]


def get_metadata_resource_version(item):
    """Return the metadata.resourceVersion of either a JSON or class object."""
    if hasattr(item, "metadata"):
        return item.metadata.resource_version
    elif isinstance(item, dict):
        return item["metadata"]["resourceVersion"]


def get_kind(item):
    """Return the Kind of either a JSON or a class object."""
    if hasattr(item, "kind"):
        if item.kind is not None:
            return item.kind

        return item.__class__.__name__
    elif isinstance(item, dict):
        return item["kind"]


def get_items(objects_list):
    """Return the .items of a K8s list response"""
    if hasattr(objects_list, "metadata"):
        return objects_list.items
    elif isinstance(objects_list, dict):
        return objects_list["items"]


def named_object(item):
    """Return a (name, namespace) tuple for a K8s object."""
    name = get_metadata_name(item)
    namespace = get_metadata_namespace(item)
    return (name, namespace)


# Hander functions for the ADDED, MODIFIED and DELETED events of a watch stream
def handle_added_event(cache, event):
    """
    Append a new CR, from event, to the existing list.

    Ensures the list for each namespace is sorted by name, when adding the
    new object.
    """
    new_object = event["object"]
    log.info("Handling ADDED event for %s: %s", get_kind(new_object),
             named_object(new_object))

    # Function for sorting based on metadata.name
    def name_key(item):
        return get_metadata_name(item)

    namespace = get_metadata_namespace(new_object)
    current_list = cache.get(namespace, [])

    # sort based on the metadata.name
    current_list.append(new_object)
    current_list.sort(key=name_key)

    # must always re-add the list, since in case of initially empty list the
    # dict had no key for that namespace.
    cache[namespace] = current_list


def handle_modified_event(cache, event):
    """Update an existing CR, from event, to the existing list"""
    new_object = event["object"]
    log.info("Handling MODIFIED event for %s: %s", get_kind(new_object),
             named_object(new_object))

    namespace = get_metadata_namespace(new_object)
    current_list = cache.get(namespace, [])
    for i, item in enumerate(current_list):
        if get_metadata_uid(item) != get_metadata_uid(new_object):
            continue

        # found, then update the list
        current_list[i] = new_object
        break


def handle_deleted_event(cache, event):
    """Delete a new CR, from event, from the existing list"""
    new_object = event["object"]
    log.info("Handling DELETED event for %s: %s", get_kind(new_object),
             named_object(new_object))

    namespace = get_metadata_namespace(new_object)
    current_list = cache.get(namespace, [])
    for i, item in enumerate(current_list):
        if get_metadata_uid(item) != get_metadata_uid(new_object):
            continue

        # if found, then update the list
        del current_list[i]
        break


# Watch buisiness logic
def update_cache_from_watch(cache, watcher, list_fn, *args, **kwargs):
    """Perform the K8s watch on CustomResource objects"""
    # Flush the current cache since a new watch operation starts
    clear_cache(cache)

    log.info("Fetching the initial list of objects.")
    objects_list = list_fn(*args, **kwargs)
    log.info("Fetched the initial list of %s.", get_kind(objects_list))

    # Create keys in the cache dict for each namespace and assign the list of
    # CRs to each namespace
    rv = get_metadata_resource_version(objects_list)
    items = get_items(objects_list)

    for item in items:
        # We treat as each distinct item was from an ADDED event
        handle_added_event(cache, {"object": item})

    kind = get_kind(objects_list)

    log.info("Initialized the cache for %s.", kind)
    cache[CACHE_INIT_KEY] = True

    log.info("Starting a watch for %s after resourceVersion: %s", kind, rv)

    # Handle the ADDED, MODIFIED, DELETED events that come from the stream
    # The greenlet sleeps here until new data is received
    for event in watcher.stream(list_fn, *args, **kwargs, resource_version=rv):
        if event["type"] == "ADDED":
            handle_added_event(cache, event)
        if event["type"] == "MODIFIED":
            handle_modified_event(cache, event)
        if event["type"] == "DELETED":
            handle_deleted_event(cache, event)


def indefinitely(cache, list_fn, *args, **kwargs):
    """
    Meant to be used inside a greenlet to continuously create a watch.

    The function will use a retry logic in case of any unexpected error. The
    cache will be considered initialized, and ready to use, once the initial
    list request is done. In case the cache is not ready then a request to K8s
    will be done instead.

    Each indefinite watch will keep a persistent connection to the API Server.
    This means that there will be a persistent connection / per watch / per
    gunicorn worker.
    """

    while True:
        w = watch.Watch()

        try:
            update_cache_from_watch(cache, w, list_fn, *args, **kwargs)
        except Exception:
            log.error(traceback.format_exc())
            clear_cache(cache)
            w.stop()

from flask import jsonify
from kubernetes import client

from .. import authn


def success_response(data_field=None, data=None):
    user = authn.get_username()
    resp = {"status": 200, "success": True, "user": user}
    if data_field is None and data is None:
        return jsonify(resp)

    resp[data_field] = data
    return jsonify(resp)


def failed_response(msg, error_code):
    user = authn.get_username()
    resp = {
        "success": False,
        "log": msg,
        "status": error_code,
        "user": user,
    }

    return resp, error_code


def label_selector_matches(label_selector, labels):
    """Check if a label_selector matches a label from the provided labels."""
    if "=" not in label_selector:
        raise ValueError("Provided label_selector does not have = operator: %s"
                         % (label_selector))

    selector_key = label_selector.split("=")[0]
    selector_value = label_selector.split("=")[1]

    for label in labels:
        if label != selector_key:
            continue

        # label key matched, checking for value
        if labels[label] != selector_value:
            continue

        return True

    # the label_selector did not match
    return False


def events_field_selector(kind, name):
    return "involvedObject.kind=%s,involvedObject.name=%s" % (kind, name)


def deserialize(json_obj, klass):
    """Convert a JSON object to a lib class object.

    json_obj: The JSON object to deserialize
    klass: The string name of the class i.e. V1Pod, V1Volume etc
    """
    try:
        return client.ApiClient()._ApiClient__deserialize(json_obj, klass)
    except ValueError as e:
        raise ValueError("Failed to deserialize input into '%s': %s"
                         % (klass, str(e)))


def serialize(obj):
    """Convert a K8s library object to JSON."""
    return client.ApiClient().sanitize_for_serialization(obj)

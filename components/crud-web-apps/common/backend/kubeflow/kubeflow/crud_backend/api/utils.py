from flask import jsonify

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


def events_field_selector(kind, name):
    return "involvedObject.kind=%s,involvedObject.name=%s" % (kind, name)

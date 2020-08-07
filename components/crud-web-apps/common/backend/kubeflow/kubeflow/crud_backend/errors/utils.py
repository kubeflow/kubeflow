import json


def failed_response(msg, error_code):
    content = {
        "success": False,
        "log": msg,
        "status": error_code,
    }

    return content, error_code


def parse_error(e):
    try:
        return json.loads(e.body)
    except (json.JSONDecodeError, KeyError, AttributeError):
        return {}


def parse_error_message(e):
    return parse_error(e).get("message", str(e))

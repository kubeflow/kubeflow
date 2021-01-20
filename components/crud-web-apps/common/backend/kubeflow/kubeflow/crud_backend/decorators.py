import functools
import logging

from flask import request
from werkzeug import exceptions

log = logging.getLogger(__name__)


def request_is_json_type(func):
    """Make sure that the current request is of type JSON"""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if request.content_type != "application/json":
            raise exceptions.BadRequest("Request is not in JSON format.")

        return func(*args, **kwargs)

    return wrapper


def required_body_params(*params):
    """
    Used to decorate a route that accepts json and must contain some specific
    fields. If a field is not present then the server will return a 400 error.
    """

    def wrapper(func):
        @functools.wraps(func)
        def runner(*args, **kwargs):
            body = request.get_json()
            for param in params:
                if param not in body:
                    raise exceptions.BadRequest(
                        "Parameter '%s' is missing from the request's"
                        " body." % param
                    )

            return func(*args, **kwargs)

        return runner

    return wrapper

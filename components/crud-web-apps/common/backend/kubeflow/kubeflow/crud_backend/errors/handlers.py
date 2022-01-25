import logging

from flask import request
from kubernetes.client.rest import ApiException
from werkzeug import exceptions

from .. import api
from . import bp, utils

log = logging.getLogger(__name__)


@bp.app_errorhandler(ApiException)
def api_exception_handler(e):
    """
    If the backend could not complete the k8s API call then the default handler
    will catch the exception, format the error message and return an
    appropriate response for the frontend
    """
    ep = request.url
    log.error("An error occured talking to k8s while working on %s: %s", ep, e)

    if e.status == 404:
        msg = "The requested resource could not be found in the API Server"
    else:
        msg = utils.parse_error_message(e)

    return api.failed_response(msg, e.status)


@bp.app_errorhandler(exceptions.HTTPException)
def handle_http_errors(e):
    log.error("HTTP Exception handled: %s", e)
    return api.failed_response(e.description, e.code)


@bp.app_errorhandler(Exception)
def catch_all(e):
    log.error("Caught and unhandled Exception!")
    log.exception(e)
    return api.failed_response("An error occured in the backend.", 500)

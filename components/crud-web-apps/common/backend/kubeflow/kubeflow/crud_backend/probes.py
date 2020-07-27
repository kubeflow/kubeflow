from flask import Blueprint, jsonify

from . import authn

bp = Blueprint("probes", __name__)


@bp.route("/healthz/liveness")
@authn.no_authentication
def liveness():
    return jsonify("alive"), 200


@bp.route("/healthz/readiness")
@authn.no_authentication
def readiness():
    return jsonify("ready"), 200

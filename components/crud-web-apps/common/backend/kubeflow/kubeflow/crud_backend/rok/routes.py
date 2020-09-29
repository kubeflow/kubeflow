from flask import Blueprint

from .. import api

bp = Blueprint("rok_base_routes", __name__)


@bp.route("/api/rok/storageclasses")
def get_rok_storageclasses():
    """
    Return a list of k8s storage classes that are provided from Rok
    """
    # TODO(kimwnasptd): Should use annotations on storage classes instead
    return api.success_response("storageClasses", ["rok"])

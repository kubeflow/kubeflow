from flask import Blueprint

bp = Blueprint("base_lib_get_routes", __name__)

from . import get  # noqa E402, F401

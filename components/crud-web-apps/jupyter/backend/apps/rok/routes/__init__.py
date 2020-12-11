from flask import Blueprint

bp = Blueprint("rok_routes", __name__)

from . import post  # noqa: F401, E402

from flask import Blueprint

bp = Blueprint("base_routes", __name__)

from . import get, post, delete  # noqa E402, F401

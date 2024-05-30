from flask import Blueprint

bp = Blueprint("base_routes", __name__)

from . import get, post, delete, patch  # noqa E402, F401

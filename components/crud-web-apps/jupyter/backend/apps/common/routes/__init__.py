from flask import Blueprint

bp = Blueprint("base_routes", __name__)

from . import get, delete, patch  # noqa: F401

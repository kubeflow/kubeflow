from flask import Blueprint

bp = Blueprint("default_routes", __name__)

from . import post  # noqa: F401, E402
from . import gpu_culling  # noqa: F401, E402

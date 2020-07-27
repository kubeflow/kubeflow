import logging

from flask import Blueprint, current_app, send_from_directory

bp = Blueprint("serving", __name__)
log = logging.getLogger(__name__)


# Caching: We want the browser to always check if the index.html file it has
# is the latest one. Also we want this check to use the ETag header and not
# the Last-Modified since our app will be served inside a container and we
# might want to roll-back.
# The JS/CSS files will have a hash in their name and thus we will want to
# cache them for as long as possible


@bp.route("/index.html")
@bp.route("/")
@bp.route("/new")
@bp.route("/form")
def serve_index():
    # Serve the index file in all other cases
    static_dir = current_app.config["STATIC_DIR"]
    log.info("Serving root file index.html")
    resp = send_from_directory(static_dir, "index.html")
    resp.headers["Cache-Control"] = "public, no-cache"
    return resp

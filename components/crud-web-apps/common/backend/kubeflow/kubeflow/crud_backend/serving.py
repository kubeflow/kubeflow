import logging

from flask import Blueprint, Response, request

from . import helpers

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
    log.info("Serving index.html for path: %s", request.path)

    return Response(
        helpers.get_prefixed_index_html(),
        mimetype="text/html",
        headers={"Cache-Control": "public, no-cache"},
    )

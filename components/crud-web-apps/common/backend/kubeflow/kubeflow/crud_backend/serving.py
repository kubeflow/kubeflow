import logging

from flask import Blueprint, Response, request

from . import csrf, helpers, settings

bp = Blueprint("serving", __name__)
log = logging.getLogger(__name__)

# Caching: We want the browser to always check if the index.html file it has
# is the latest one. Also we want this check to use the ETag header and not
# the Last-Modified since our app will be served inside a container and we
# might want to roll-back.
# The JS/CSS files will have a hash in their name and thus we will want to
# cache them for as long as possible

def get_username():
    if settings.USER_HEADER not in request.headers:
        log.debug("User header not present!")
        username = None
    else:
        user = request.headers[settings.USER_HEADER]
        username = user.replace(settings.USER_PREFIX, "")
        log.info("User: '%s' | Headers: '%s' '%s'",
                  username, settings.USER_HEADER, settings.USER_PREFIX)

    return username

@bp.route("/index.html")
@bp.route("/")
@bp.route("/<path:path>")
def serve_index(path="/"):
    # Serve the index file in all other cases
    log.info("Serving index.html for path: %s", path)

    user = get_username()
    log.info("Handling request for user: %s", user)
    
    no_cache = "no-cache, no-store, must-revalidate, max-age=0"
    resp = Response(helpers.get_prefixed_index_html(), mimetype="text/html",
                    headers={"Cache-Control": no_cache})

    csrf.set_cookie(resp)

    return resp

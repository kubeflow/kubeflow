import logging
import os
from distutils.util import strtobool

from flask import Flask, Blueprint
from flask_cors import CORS
from kubeflow_jupyter.common import settings
from kubeflow_jupyter.common.base_app import app as base
from kubeflow_jupyter.default.app import app as default
from kubeflow_jupyter.rok.app import app as rok

logger = logging.getLogger("entrypoint")

index_bp = Blueprint("static", __name__)


@index_bp.route("/")
@index_bp.route("/new")
def index():
    logger.info("Serving index.html")
    return index_bp.send_static_file("index.html")


def main():
    # Get the UIs
    ui = os.environ.get("UI", "default")
    prefix = os.environ.get("URL_PREFIX", "/jupyter")
    dev_mode = strtobool(os.environ.get("DEV_MODE", "False"))

    uis = {
        "default": default,
        "rok": rok,
    }

    try:
        app_bp = uis[ui]
    except KeyError:
        logger.error("Unknown UI {ui}. Select from one of {list(uis.keys())}")
        exit(1)

    index_bp.static_folder = f"kubeflow_jupyter/{ui}/static/"
    index_bp.static_url_path = "/static/"

    app = Flask(__name__)
    app.register_blueprint(index_bp, url_prefix=prefix)
    app.register_blueprint(app_bp, url_prefix=prefix)
    app.register_blueprint(base, url_prefix=prefix)

    if dev_mode:
        settings.DEV_MODE = True

        logger.warning("Enabling CORS")
        CORS(app)

    app.run(host="0.0.0.0")


if __name__ == "__main__":
    main()

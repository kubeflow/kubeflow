import os

import kubeflow.kubeflow.crud_backend as base
from kubeflow.kubeflow.crud_backend import config, logging

from .routes import bp as routes_bp

log = logging.getLogger(__name__)


def create_app(name=__name__, cfg: config.Config = None):
    cfg = config.Config() if cfg is None else cfg

    # Properly set the static serving directory
    static_dir = os.path.join(
        os.path.abspath(os.path.dirname(__file__)), "static"
    )

    app = base.create_app(name, static_dir, cfg)

    log.info("Setting STATIC_DIR to: " + static_dir)
    app.config["STATIC_DIR"] = static_dir

    # Register the app's blueprints
    app.register_blueprint(routes_bp)

    return app

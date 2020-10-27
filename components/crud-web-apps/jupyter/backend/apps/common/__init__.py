import kubeflow.kubeflow.crud_backend as base
from kubeflow.kubeflow.crud_backend import config, logging

from .routes import bp as routes_bp

log = logging.getLogger(__name__)


def create_app(name=__name__, static_folder="static",
               cfg: config.Config = None):
    cfg = config.Config() if cfg is None else cfg

    app = base.create_app(name, static_folder, cfg)

    # Register the app's blueprints
    app.register_blueprint(routes_bp)

    return app

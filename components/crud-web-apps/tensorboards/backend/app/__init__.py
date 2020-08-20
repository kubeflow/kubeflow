import kubeflow.kubeflow.crud_backend as base
from kubeflow.kubeflow.crud_backend import config, logging

from .routes import bp as routes_bp

log = logging.getLogger(__name__)


def create_app(
    name=__name__, static_folder="static", config_class=config.Config
):
    app = base.create_app(name, static_folder, config_class)

    # Register the app's blueprints
    app.register_blueprint(routes_bp)

    return app

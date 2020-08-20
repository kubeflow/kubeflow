import os

from kubeflow.kubeflow.crud_backend import config, logging
import app

log = logging.getLogger(__name__)

APP_NAME = os.environ.get("APP_NAME", "Tensorboard Web App")
BACKEND_MODE = os.environ.get("BACKEND_MODE", "prod")  # 'prod' or 'dev'

# Load the Dev config based on BACKEND_MODE env var
if BACKEND_MODE == "dev":
    cfg = config.DevConfig
else:
    cfg = config.Config

_app = app.create_app(name=APP_NAME, config_class=cfg)

if __name__ == "__main__":
    _app.run()

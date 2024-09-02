import os
import sys

from apps import default
from kubeflow.kubeflow.crud_backend import config, logging

log = logging.getLogger(__name__)

APP_NAME = os.environ.get("APP_NAME", "Jupyter Web App")
BACKEND_MODE = os.environ.get("BACKEND_MODE",
                              config.BackendMode.PRODUCTION.value)
PREFIX = os.environ.get("APP_PREFIX", "/")

# Check both values for determining what flavor to load
UI_FLAVOR = os.environ.get("UI_FLAVOR", None)
if UI_FLAVOR is None:
    UI_FLAVOR = os.environ.get("UI", "default")

cfg = config.get_config(BACKEND_MODE)
cfg.PREFIX = PREFIX

# Load the app based on UI_FLAVOR env var
if UI_FLAVOR == "default":
    app = default.create_app(APP_NAME, cfg)
else:
    log.error("No UI flavor for '%s'" % UI_FLAVOR)
    sys.exit(1)

if __name__ == "__main__":
    app.run()

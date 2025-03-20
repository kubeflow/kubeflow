import os
import sys

import gevent
from kubeflow.kubeflow.crud_backend import config, logging
from kubeflow.kubeflow.crud_backend.api import pod, pvc

from apps import default

log = logging.getLogger(__name__)


APP_NAME = os.environ.get("APP_NAME", "Volumes Web App")
BACKEND_MODE = os.environ.get("BACKEND_MODE",
                              config.BackendMode.PRODUCTION.value)
UI_FLAVOR = os.environ.get("UI_FLAVOR", "default")
PREFIX = os.environ.get("APP_PREFIX", "/")

cfg = config.get_config(BACKEND_MODE)
cfg.PREFIX = PREFIX

# Load the app based on UI_FLAVOR env var
if UI_FLAVOR == "default":
    app = default.create_app(APP_NAME, cfg)
else:
    log.error("No UI flavor for '%s'", UI_FLAVOR)
    sys.exit(1)


# Start the background watches
gevent.spawn(pod.watch_pods_all_namespaces)
gevent.spawn(pvc.watch_pvcs_all_namespaces)


if __name__ == "__main__":
    app.run()

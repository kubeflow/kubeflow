import os
import logging
from kubeflow_jupyter.default.app import app as default
from kubeflow_jupyter.rok.app import app as rok

logger = logging.getLogger("entrypoint")
ui = os.environ.get("UI", "default")
apps = {
    'default': default,
    'rok': rok
}

try:
    apps[ui].run(host="0.0.0.0")
except KeyError:
    logger.warning("There is no " + ui + " UI to load.")
    exit(1)

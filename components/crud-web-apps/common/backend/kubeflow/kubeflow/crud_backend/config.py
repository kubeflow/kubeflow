import enum
import logging
import os

from flask import current_app

log = logging.getLogger(__name__)


class BackendMode(enum.Enum):
    DEVELOPMENT = "dev"
    DEVELOPMENT_FULL = "development"
    PRODUCTION = "prod"
    PRODUCTION_FULL = "production"


def dev_mode_enabled():
    env = current_app.config.get("ENV")
    return (env == BackendMode.DEVELOPMENT_FULL.value or  # noqa: W504
            env == BackendMode.DEVELOPMENT.value)


def get_config(mode):
    """Return a config based on the selected mode."""
    config_classes = {
        BackendMode.DEVELOPMENT.value: DevConfig,
        BackendMode.DEVELOPMENT_FULL.value: DevConfig,
        BackendMode.PRODUCTION.value: ProdConfig,
        BackendMode.PRODUCTION_FULL.value: ProdConfig,
    }

    cfg_class = config_classes.get(mode)
    if not cfg_class:
        raise RuntimeError("Backend mode '%s' is not implemented. Choose one"
                           " of %s" % (mode, list(config_classes.keys())))
    return cfg_class()


class Config(object):
    ENV = "generic"
    DEBUG = False
    STATIC_DIR = "./static/"
    JSONIFY_PRETTYPRINT_REGULAR = True
    LOG_LEVEL = logging.INFO
    PREFIX = "/"

    def __init__(self):
        if os.environ.get("LOG_LEVEL_DEBUG", "false") == "true":
            self.LOG_LEVEL = logging.DEBUG


class DevConfig(Config):
    ENV = BackendMode.DEVELOPMENT_FULL.value
    DEBUG = True
    LOG_LEVEL = logging.DEBUG

    def __init__(self):
        super()
        log.warn("RUNNING IN DEVELOPMENT MODE")


class ProdConfig(Config):
    ENV = BackendMode.PRODUCTION_FULL.value

import os
import enum
import logging

from flask import current_app


log = logging.getLogger(__name__)


class BackendMode(enum.Enum):
    DEVELOPMENT = "dev"
    DEVELOPMENT_FULL = "development"
    PRODUCTION = "prod"
    PRODUCTION_FULL = "production"


def dev_mode_enabled():
    return (current_app.config.get("ENV") == BackendMode.DEVELOPMENT_FULL.value
            or current_app.config.get("ENV") == BackendMode.DEVELOPMENT.value)


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

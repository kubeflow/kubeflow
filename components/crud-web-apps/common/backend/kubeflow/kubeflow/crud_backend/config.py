import logging
import os

from flask import current_app

DEV_MODE = "development"
PROD_MODE = "production"


log = logging.getLogger(__name__)


def dev_mode_enabled():
    return current_app.config["ENV"] == DEV_MODE


class Config(object):
    ENV = PROD_MODE
    DEBUG = False
    STATIC_DIR = "./static/"
    JSONIFY_PRETTYPRINT_REGULAR = True
    LOG_LEVEL = logging.INFO

    def __init__(self):
        if os.environ.get("LOG_LEVEL_DEBUG", "false") == "true":
            self.LOG_LEVEL = logging.DEBUG


class DevConfig(Config):
    ENV = DEV_MODE
    DEBUG = True
    LOG_LEVEL = logging.DEBUG

    def __init__(self):
        super()
        log.warn("RUNNING IN DEVELOPMENT MODE")


class ProdConfig(Config):
    ENV = PROD_MODE

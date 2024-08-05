import logging

from flask import Flask

from importlib.metadata import version
from prometheus_flask_exporter import PrometheusMetrics

log = logging.getLogger(__name__)


def enable_metrics(app: Flask) -> None:
    """Enable Prometheus metrics fro backend app."""
    log.info("Enabling the Prometheus metrics for %s", app.name)
    backend_version = version("kubeflow")

    log.debug("Backend verzia je %s", backend_version)
    metrics = PrometheusMetrics(app, default_labels={"app": app.name})

    # add default metrics with info about app
    metrics.info("app_info", "Application info", version=backend_version)

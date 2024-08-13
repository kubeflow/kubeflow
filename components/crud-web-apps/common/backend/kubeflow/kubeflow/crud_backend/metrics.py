import logging

from importlib.metadata import version
from flask import Flask
from prometheus_flask_exporter import PrometheusMetrics

log = logging.getLogger(__name__)


def enable_metrics(app: Flask) -> None:
    """Enable Prometheus metrics fro backend app.

    This function will enable metrics collection for all routes and expose them
    at /metrics.

    Default metrics are:
        flask_http_request_duration_seconds (Histogram)
        flask_http_request_total (Counter)
        flask_http_request_exceptions_total (Counter)
        flask_exporter_info (Gauge)
    """
    log.info("Enabling the Prometheus metrics for %s", app.name)
    backend_version = version("kubeflow")
    log.debug("Backend version is %s", backend_version)
    metrics = PrometheusMetrics(app, default_labels={"app": app.name})
    # add default metrics with info about app
    metrics.info("app_info", "Application info", version=backend_version)

import logging
import sys

from flask import Flask
from prometheus_flask_exporter import PrometheusMetrics

log = logging.getLogger(__name__)


def _get_backend_version() -> str:
    """Get the backend version.

    The version is defined in setup.py.
    """
    if sys.version_info >= (3, 8):
        from importlib import metadata
    else:
        import importlib_metadata as metadata

    return metadata.version("kubeflow")


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
    backend_version = _get_backend_version()
    log.debug("Backend version is %s", backend_version)
    metrics = PrometheusMetrics(
        app, group_by="url_rule", default_labels={"app": app.name}
    )
    # add default metrics with info about app
    metrics.info(
        "app_info", "Application info", version=backend_version, app=app.name
    )

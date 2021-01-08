#!/opt/conda/bin/python
"""
This file starts a server that handles requests and runs a Jupyter notebook
file using papermill, then saves generated figures to PlatIAgro.
"""
import json
import os

import pandas as pd
import papermill
import requests

BASE_URL = os.getenv(
    "JUPYTER_ENDPOINT",
    "http://server.anonymous:80/notebook/anonymous/server/api/contents",
)


def upload_to_jupyter(notebook_path):
    """
    Uploads output notebook to PlatIAgro Jupyter notebook server.
    This will make it available for visualization.

    Parameters
    ----------
    notebook_path : str
    """
    print("Uploading to Jupyter Notebook server...", flush=True)

    headers = {"X-XSRFToken": "token", "Cookie": "_xsrf=token"}

    path = ""
    for directory in notebook_path.split("/")[:-1]:
        path = f"{path}/{directory}"
        requests.put(
            f"{BASE_URL}{path}",
            json={"type": "directory"},
            headers=headers,
        )

    with open(notebook_path) as f:
        content = json.load(f)

    requests.put(
        f"{BASE_URL}/{notebook_path}",
        json={
            "type": "notebook",
            "content": content,
        },
        headers=headers,
    )


class Model:
    def __init__(self):
        pass

    def predict(self, X, feature_names, meta=None):
        df = pd.DataFrame(X)
        df.to_csv("/tmp/data/history.csv", index=False)

        output_path = "Monitoring.ipynb"
        papermill.execute_notebook(
            "/task/Experiment.ipynb",
            output_path,
            parameters={"dataset": "/tmp/data/history.csv"},
        )
        upload_to_jupyter(output_path)

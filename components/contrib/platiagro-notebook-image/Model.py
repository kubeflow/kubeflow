#!/opt/conda/bin/python
"""
This file starts a server that handles requests and runs a Jupyter notebook
file using papermill, then saves generated figures to PlatIAgro.
"""
import json
import logging
import os
import tempfile

import pandas as pd
import papermill
import requests
import platiagro

BASE_URL = os.getenv(
    "JUPYTER_ENDPOINT",
    "http://server.anonymous:80/notebook/anonymous/server/api/contents",
)
DEPLOYMENT_ID = os.getenv("DEPLOYMENT_ID")


def save_figures(notebook_path):
    """
    Stores images and html outputs from a notebook using platiagro SDK.
    This will make them available in the Web-UI.

    Parameters
    ----------
    notebook_path : str
    """
    logging.info("Saving figures...")
    with open(notebook_path, "rb") as f:
        notebook = json.load(f)

    cells = notebook["cells"]
    for cell in cells:
        if "outputs" in cell:
            outputs = cell["outputs"]
            for output in outputs:
                if "data" in output:
                    data = output["data"]
                    keys = data.keys()
                    for key in keys:
                        if "html" in key:
                            html = data[key]
                            plotly_figure = "".join(html).replace(
                                '["plotly"]',
                                '["https://cdn.plot.ly/plotly-latest.min.js"]'
                            )
                            html_figure = f'<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script></head><body>{plotly_figure}</body></html>'
                            platiagro.save_figure(
                                figure=html_figure,
                                extension="html"
                            )

                        elif "image" in key:
                            platiagro.save_figure(
                                figure=data[key],
                                extension=key.split("/")[1]
                            )


def upload_to_jupyter(notebook_path):
    """
    Uploads output notebook to PlatIAgro Jupyter notebook server.
    This will make it available for visualization.

    Parameters
    ----------
    notebook_path : str
    """
    logging.info("Uploading to Jupyter Notebook server...")

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


def make_cells_readonly(notebook_path):
    """
    Edits output notebook to make all cells readonly.

    Parameters
    ----------
    notebook_path : str
    """
    logging.info("Editing notebook to make it read-only...")

    with open(notebook_path, "rb") as notebook_file:
        notebook = json.load(notebook_file)

        cells = notebook["cells"]
        for cell in cells:
            metadata = cell["metadata"]
            metadata["deletable"] = False
            metadata["editable"] = False

    with open(notebook_path, "w") as f:
        json.dump(notebook, f, sort_keys=True, indent=4)


class Model:
    def __init__(self):
        os.makedirs("/tmp/data", exist_ok=True)

    def predict(self, X, feature_names, meta=None):
        dataset = next(tempfile._get_candidate_names())
        dataset_path = f"/tmp/data/{dataset}.csv"
        logging.info(
            f"Downloading deployment data {dataset}. X.shape = {X.shape}...")

        df = pd.DataFrame(X, columns=feature_names)
        df.to_csv(dataset_path, index=False)

        notebook_path = "/task/Experiment.ipynb"
        output_path = f"deployments/{DEPLOYMENT_ID}/Monitoring.ipynb"
        os.makedirs(output_path.rsplit("/", 1)[0], exist_ok=True)

        logging.info(f"Executing notebook {notebook_path}...")
        try:
            papermill.execute_notebook(
                notebook_path,
                output_path,
                parameters={"dataset": dataset_path},
            )
        except papermill.exceptions.PapermillExecutionError:
            logging.exception("Monitoring Task Error")
            pass

        make_cells_readonly(output_path)
        upload_to_jupyter(output_path)
        save_figures(output_path)
        os.remove(dataset_path)

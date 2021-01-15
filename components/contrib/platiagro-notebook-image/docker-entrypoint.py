#!/opt/conda/bin/python
"""
This file runs a Jupyter notebook file using papermill, then saves generated
datasets, figures and output notebook to PlatIAgro.
"""
import json
import os
import tempfile
import re

import pandas as pd
import papermill
import platiagro
import requests

COOKIES = {"_xsrf": "token"}
HEADERS = {"content-type": "application/json", "X-XSRFToken": "token"}

BASE_URL = os.getenv("JUPYTER_ENDPOINT", "http://server.anonymous:80/notebook/anonymous/server/api/contents")
SESSION = requests.Session()
SESSION.cookies.update(COOKIES)
SESSION.headers.update(HEADERS)
RETRY_STRATEGY = requests.packages.urllib3.util.retry.Retry(
    total=5,
    backoff_factor=0.5,
    status_forcelist=[429, 500, 502, 503, 504],
    method_whitelist=["HEAD", "GET", "PUT", "OPTIONS", "DELETE"]
)
ADAPTER = requests.adapters.HTTPAdapter(max_retries=RETRY_STRATEGY)
SESSION.mount("http://", ADAPTER)


def execute_notebook(notebook_path, output_path):
    """
    Executes a notebook and saves the output.

    Parameters
    ----------
    notebook_path : str
    output_path : str
    """
    print(f"Executing notebook {notebook_path}...", flush=True)
    prefix = "PARAMETER_"
    parameters = {}
    for var in os.environ:
        if var.startswith(prefix):
            name = var[len(prefix):]
            value = os.environ[var]

            try:
                value = json.loads(value)
            except json.decoder.JSONDecodeError:
                value = None

            parameters[name] = value

    print(f"Parameters are: {parameters}...", flush=True)
    notebook_path = re.sub("minio://", "s3://", notebook_path, 1)
    os.makedirs(output_path.rsplit("/", 1)[0], exist_ok=True)

    papermill.execute_notebook(
        notebook_path,
        output_path,
        parameters=parameters,
    )


def save_dataset(dataset):
    """
    Stores dataset file in a persistent storage using platiagro SDK.
    This will make it available in the Web-UI.

    Parameters
    ----------
    dataset : str
    """
    print(f"Saving dataset {dataset}...", flush=True)
    try:
        dataset = json.loads(dataset)
    except json.decoder.JSONDecodeError:
        return

    try:
        df = pd.read_csv(dataset)
        platiagro.save_dataset(name=dataset.rsplit("/")[-1], df=df)
    except pd.errors.EmptyDataError:
        content = open(dataset, "rb")
        platiagro.save_dataset(name=dataset.rsplit("/")[-1], data=content)


def save_figures(notebook_path):
    """
    Stores images and html outputs from a notebook using platiagro SDK.
    This will make them available in the Web-UI.

    Parameters
    ----------
    notebook_path : str
    """
    print("Saving figures...", flush=True)
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
                            if "script" not in html[0]:
                                plotly_figure = "".join(html).replace('["plotly"]', '["https://cdn.plot.ly/plotly-latest.min.js"]')
                                html_figure = f'<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script></head><body>{plotly_figure}</body></html>'
                                platiagro.save_figure(figure=html_figure, extension="html")
                        elif "image" in key:
                            platiagro.save_figure(figure=data[key], extension=key.split("/")[1])


def make_cells_readonly(notebook_path):
    """
    Edits output notebook to make all cells readonly.

    Parameters
    ----------
    notebook_path : str
    """
    print("Editing notebook to make it read-only...", flush=True)

    with open(notebook_path, "rb") as notebook_file:
        notebook = json.load(notebook_file)

        cells = notebook["cells"]
        for cell in cells:
            metadata = cell["metadata"]
            metadata["deletable"] = False
            metadata["editable"] = False

    with open(notebook_path, "w") as f:
        json.dump(notebook, f, sort_keys=True, indent=4)


def upload_to_jupyter(notebook_path, destination_path):
    """
    Uploads output notebook to PlatIAgro Jupyter notebook server.
    This will make it available for visualization.

    Parameters
    ----------
    notebook_path : str
    destination_path : str
    """
    print("Uploading to Jupyter Notebook server...", flush=True)

    path = ""
    for directory in destination_path.split("/")[:-1]:
        path = f"{path}/{directory}"
        SESSION.put(
            f"{BASE_URL}{path}",
            json={"type": "directory"},
        )

    with open(notebook_path) as f:
        content = json.load(f)

    SESSION.put(
        f"{BASE_URL}/{destination_path}",
        json={
            "type": "notebook",
            "content": content,
        },
    )


def main():
    """
    """
    experiment_id = os.environ["EXPERIMENT_ID"]
    operator_id = os.environ["OPERATOR_ID"]
    notebook_path = os.environ["NOTEBOOK_PATH"]
    dataset = os.environ["PARAMETER_dataset"]
    output_path = os.path.join(tempfile._get_default_tempdir(), notebook_path)

    exception = None
    try:
        execute_notebook(notebook_path, output_path)
    except papermill.exceptions.PapermillExecutionError as e:
        exception = e

    save_dataset(dataset)
    save_figures(output_path)
    make_cells_readonly(output_path)

    destination_path = f"experiments/{experiment_id}/operators/{operator_id}/{notebook_path}"
    upload_to_jupyter(output_path, destination_path)

    if exception is not None:
        raise exception


if __name__ == "__main__":
    main()

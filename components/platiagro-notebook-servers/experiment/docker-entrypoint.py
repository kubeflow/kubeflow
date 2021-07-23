#!/opt/conda/bin/python
"""
This file runs a Jupyter notebook file using papermill, then saves generated
datasets, figures and output notebook to PlatIAgro.
"""
import json
import logging
import os
import tempfile
import re

import pandas as pd
import papermill
import platiagro
import requests

logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s",
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S")

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
    allowed_methods=["HEAD", "GET", "PUT", "OPTIONS", "DELETE"]
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
    logging.info(f"Executing notebook {notebook_path}...")
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

    logging.info(f"Parameters are: {parameters}...")
    notebook_path = re.sub("minio://", "s3://", notebook_path, 1)
    os.makedirs(output_path.rsplit("/", 1)[0], exist_ok=True)

    papermill.execute_notebook(
        notebook_path,
        output_path,
        parameters=parameters,
        progress_bar=False,
    )


def download_dataset(dataset):
    """
    Downloads the dataset to a local path (if it does not exist locally yet).

    Parameters
    ----------
    dataset : str
    """
    logging.info(f"Download dataset {dataset}...")
    try:
        dataset = json.loads(dataset)
    except json.decoder.JSONDecodeError:
        return

    dataset = dataset.rsplit("/")[-1]
    dataset_path = f"/tmp/data/{dataset}"

    if not os.path.exists(dataset_path):
        platiagro.download_dataset(dataset, dataset_path)
    else:
        try:
            # search for the metadata file of this run, if it exists,
            # it isn't necessary to download the dataset again.
            metadata = platiagro.stat_dataset(dataset)

            # check if the metadata file is from the current run
            if metadata.get("run_id") != os.getenv("RUN_ID"):
                platiagro.download_dataset(dataset, dataset_path)
        except FileNotFoundError:
            platiagro.download_dataset(dataset, dataset_path)


def save_dataset(dataset):
    """
    Stores dataset file in a persistent storage using platiagro SDK.
    This will make it available in the Web-UI.

    Parameters
    ----------
    dataset : str
    """
    logging.info(f"Saving dataset {dataset}...")
    try:
        dataset = json.loads(dataset)
    except json.decoder.JSONDecodeError:
        return

    dataset = dataset.rsplit("/")[-1]
    dataset_path = f"/tmp/data/{dataset}"

    try:
        df = pd.read_csv(dataset_path, sep=None, engine="python")
        platiagro.save_dataset(name=dataset, df=df)
    except (pd.errors.EmptyDataError, pd.errors.ParserError, UnicodeDecodeError, ValueError):
        content = open(dataset_path, "rb")
        platiagro.save_dataset(name=dataset, data=content)


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

                    # Plot.ly outputs starts with 1 data.text/html containing the javascript required by Plot.ly.
                    # Then, it outputs data."application/vnd.plotly.v1+json" and data."text/html" for each plot.
                    # The code below calls platiagro.save_figure once for each plot,
                    # but not for the first output, which is appended to all plots.
                    if {"application/vnd.plotly.v1+json", "text/html"}.issubset(keys):
                        html = "".join(data["text/html"])
                        plotly_figure = "".join(html).replace(
                            '["plotly"]',
                            '["https://cdn.plot.ly/plotly-latest.min.js"]'
                        )
                        html_figure = f'<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script></head><body>{plotly_figure}</body></html>'
                        platiagro.save_figure(
                            figure=html_figure,
                            extension="html"
                        )
                    else:
                        for key in keys:
                            if key.startswith("image/"):
                                platiagro.save_figure(
                                    figure=data[key],
                                    extension=key.split("/")[1]
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


def upload_to_jupyter(notebook_path, destination_path):
    """
    Uploads output notebook to PlatIAgro Jupyter notebook server.
    This will make it available for visualization.

    Parameters
    ----------
    notebook_path : str
    destination_path : str
    """
    logging.info("Uploading to Jupyter Notebook Server...")

    path = ""
    try:
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
    except requests.exceptions.ConnectionError:
        logging.warning("Jupyter Notebook Server is currently unavailable, the output notebook will not be uploaded.")


def main():
    """
    """
    experiment_id = os.environ["EXPERIMENT_ID"]
    operator_id = os.environ["OPERATOR_ID"]
    notebook_path = os.environ["NOTEBOOK_PATH"]
    dataset = os.environ["PARAMETER_dataset"]
    output_path = os.path.join(tempfile._get_default_tempdir(), notebook_path)

    exception = None

    if dataset:
        download_dataset(dataset)

    if notebook_path:
        try:
            execute_notebook(notebook_path, output_path)
        except papermill.exceptions.PapermillExecutionError as e:
            exception = e

        make_cells_readonly(output_path)

        destination_path = f"experiments/{experiment_id}/operators/{operator_id}/{notebook_path}"
        upload_to_jupyter(output_path, destination_path)

        save_figures(output_path)

    if dataset:
        save_dataset(dataset)

    if exception is not None:
        logging.error("Exception raised when running a notebook.")
        raise exception


if __name__ == "__main__":
    main()

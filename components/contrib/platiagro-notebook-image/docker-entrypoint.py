#!/opt/conda/bin/python
"""
This file runs a Jupyter notebook file using papermill, then saves generated
datasets, figures and output notebook to PlatIAgro.
"""
import json
import os

import papermill
import platiagro
import requests


def save_dataset(dataset):
    """
    Stores file /tmp/data/{dataset} in a persistent storage using platiagro SDK.
    This will make it available in the Web-UI.

    Parameters
    ----------
    dataset : str
    """
    print("Saving dataset...", flush=True)
    content = open(dataset, "rb")
    platiagro.save_dataset(name=dataset, data=content)


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
                                plotly_figure = "".join(html).replace(
                                    '["plotly"]', '["https://cdn.plot.ly/plotly-latest.min.js"]')
                                html_figure = '<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script></head><body>' + \
                                    plotly_figure + '</body></html>'
                                platiagro.save_figure(figure=html_figure,
                                                      extension='html')
                        elif "image" in key:
                            platiagro.save_figure(
                                figure=data[key], extension=key.split("/")[1])


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


def upload_to_jupyter(notebook_path):
    """
    Uploads output notebook to PlatIAgro Jupyter notebook server.
    This will make it available for visualization.

    Parameters
    ----------
    notebook_path : str
    """
    print("Uploading to Jupyter Notebook server...", flush=True)

    base_url = "http://server.anonymous:80/notebook/anonymous/server/api/contents"
    headers = {"X-XSRFToken": "token", "Cookie": "_xsrf=token"}

    parts = notebook_path.split("/")
    path = ""

    for directory in parts[:-1]:
        path = f"{path}/{directory}"
        requests.put(
            f"{base_url}{path}",
            json={"type": "directory"},
            headers=headers,
        )

    with open(notebook_path) as f:
        content = json.load(f)

    requests.put(
        f"{base_url}/{notebook_path}",
        json={
            "type": "notebook",
            "content": content,
        },
        headers=headers,
    )


def main():
    """
    """
    experiment_id = os.environ["EXPERIMENT_ID"]
    operator_id = os.environ["OPERATOR_ID"]
    notebook_path = os.environ["NOTEBOOK_PATH"]
    dataset = os.environ["PARAMETER_dataset"]
    output_path = f"experiments/{experiment_id}/operators/{operator_id}/Experiment.ipynb"

    prefix = "PARAMETER_"
    parameters = {}
    for var in os.environ:
        if var.startswith(prefix):
            name = var[len(prefix):]
            parameters[name] = os.environ[var]

    papermill.execute_notebook(
        notebook_path,
        output_path,
        parameters=parameters,
    )

    save_dataset(dataset)
    save_figures(output_path)
    make_cells_readonly(output_path)
    upload_to_jupyter(output_path)


if __name__ == "__main__":
    main()

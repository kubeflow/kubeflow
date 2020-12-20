#!/bin/bash
# This file runs a Jupyter notebook file, then saves generated datasets, figures
# and output notebook to PlatIAgro.

###############################################################################
# Stores files from /tmp/data/ in a persistent storage using platiagro SDK.
# This will make them available in the Web-UI.
###############################################################################
save_dataset() {
    echo "Saving dataset"
    DATASET=$1
    python3 <<EOF
from platiagro import save_dataset

content = open("/tmp/data/$DATASET", "rb")
save_dataset(name=dataset, data=content)
EOF
}

###############################################################################
# Stores images and html outputs from a notebook using platiagro SDK.
# This will make them available in the Web-UI.
###############################################################################
save_figures() {
    filename=$1
    python3 <<EOF
from json import loads
from platiagro import save_figure

with open("${filename}", "rb") as notebook_file:
    notebook = loads(notebook_file.read())
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
                                html_figure = '<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script></head><body>' + plotly_figure + '</body></html>'
                                save_figure(figure=html_figure, extension='html')
                        elif "image" in key:
                            save_figure(figure=data[key], extension=key.split("/")[1])
EOF
}

###############################################################################
# Edits output notebook to make all cells readonly.
###############################################################################
make_cells_readonly() {
    filename=$1
    python3 <<EOF
from json import dumps, loads

with open("${filename}", "rb") as notebook_file:
    notebook = loads(notebook_file.read())
    cells = notebook["cells"]
    for cell in cells:
        metadata = cell["metadata"]
        metadata["deletable"] = False
        metadata["editable"] = False

    f = open("${filename}", "w")
    f.write(dumps(notebook, sort_keys=True, indent=4))
    f.close()
EOF
}

###############################################################################
# Uploads output notebook to Jupyter.
# The file is put under experiments/experimentId/operators/operatorId/
# This will make it available for visualization.
###############################################################################
upload_to_jupyter() {
    experimentId=$1
    operatorId=$2
    filename=$3

    curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments \
        -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' \
        --data '{"type":"directory"}'
    curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/${experimentId} \
        -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' \
        --data '{"type":"directory"}'
    curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/${experimentId}/operators \
        -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' \
        --data '{"type":"directory"}'
    curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/${experimentId}/operators/${operatorId} \
        -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' \
        --data '{"type":"directory"}'

    echo "{\"type\":\"notebook\", \"content\":" > data.json
    cat ${filename} >> data.json
    echo "}" >> data.json

    # NOTE: we can't replace the file "data.json" by a variable!
    # Otherwise the command below could exceed the command line character limit.

    curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/${experimentId}/operators/${operatorId}/${filename} \
        -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' \
        --data @data.json
}

OUTPUT_PATH="Experiment.ipynb"

PARAMETERS_BASE64=$(python3 <<EOF
import base64
import os
import yaml

prefix = "PARAMETER_"
parameters = {}
for var in os.environ:
    if var.startswith(prefix):
        name = var[len(prefix):]
        parameters[name] = os.environ[var]
print(base64.b64encode(yaml.dump(parameters).encode()).decode())
EOF
)

papermill ${NOTEBOOK_PATH} ${OUTPUT_PATH} -b ${PARAMETERS_BASE64}
STATUS=$?

save_dataset ${PARAMETER_DATASET}
save_figure ${OUTPUT_PATH}
make_cells_readonly ${OUTPUT_PATH}
upload_to_jupyter ${EXPERIMENT_ID} ${OPERATOR_ID} ${OUTPUT_PATH}
exit ${STATUS}

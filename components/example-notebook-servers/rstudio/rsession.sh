#!/usr/bin/env bash

# activate "base" conda environment
. /opt/conda/etc/profile.d/conda.sh
conda activate base

# set the default reticulate python to the one from the conda environment
# https://rstudio.github.io/reticulate/articles/versions.html#order-of-discovery
export RETICULATE_PYTHON_FALLBACK="${CONDA_PREFIX}/bin/python"

/usr/lib/rstudio-server/bin/rsession "$@"
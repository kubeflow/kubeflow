#!/usr/bin/env bash
# Copyright 2017 The Kubeflow Authors All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -ex

# set default ip to 0.0.0.0
if [[ "$NOTEBOOK_ARGS $@" != *"--ip="* ]]; then
  NOTEBOOK_ARGS="--ip=0.0.0.0 $NOTEBOOK_ARGS"
fi

# handle some deprecated environment variables
# from DockerSpawner < 0.8.
# These won't be passed from DockerSpawner 0.9,
# so avoid specifying --arg=empty-string
if [ ! -z "$NOTEBOOK_DIR" ]; then
  NOTEBOOK_ARGS="--notebook-dir='$NOTEBOOK_DIR' $NOTEBOOK_ARGS"
fi
if [ ! -z "$JPY_PORT" ]; then
  NOTEBOOK_ARGS="--port=$JPY_PORT $NOTEBOOK_ARGS"
fi
if [ ! -z "$JPY_USER" ]; then
  NOTEBOOK_ARGS="--user=$JPY_USER $NOTEBOOK_ARGS"
fi
if [ ! -z "$JPY_COOKIE_NAME" ]; then
  NOTEBOOK_ARGS="--cookie-name=$JPY_COOKIE_NAME $NOTEBOOK_ARGS"
fi
if [ ! -z "$JPY_BASE_URL" ]; then
  NOTEBOOK_ARGS="--base-url=$JPY_BASE_URL $NOTEBOOK_ARGS"
fi
if [ ! -z "$JPY_HUB_PREFIX" ]; then
  NOTEBOOK_ARGS="--hub-prefix=$JPY_HUB_PREFIX $NOTEBOOK_ARGS"
fi
if [ ! -z "$JPY_HUB_API_URL" ]; then
  NOTEBOOK_ARGS="--hub-api-url=$JPY_HUB_API_URL $NOTEBOOK_ARGS"
fi

# check to see if a PV has been mounted
. /usr/local/bin/pvc-check.sh

# We delay enabling the Jupyter extension until runtime because
# enabling it tries to import tensorflow and on GPUs that requires
# the CUDA libraries.
# We do this after the PVC check because we will be instlaling it into the
# home directory. We can't install into the system directory
# because we run as Jovyan and don't have permission
if [ -z "$DISABLE_TFMA_EXTENSION" ]; then
  # Ignore errors because we don't want to prevent notebook startup.
  # The commands will fail on older images which don't have TFMA in them.
  # We also get errors when rerunning install if its already been installed.
  set +e
  # Need to activate the py2 environment to install TFMA
  source activate py2
  jupyter nbextension install --py --user --symlink tensorflow_model_analysis
  jupyter nbextension enable --py --user tensorflow_model_analysis
  set -e
fi

. /usr/local/bin/start.sh jupyterhub-singleuser $NOTEBOOK_ARGS $@

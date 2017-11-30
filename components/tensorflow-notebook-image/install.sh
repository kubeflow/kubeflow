#!/usr/bin/env bash
#
# An install script to be called from the DOCKERFILE
set -ex
conda create -n py2 python=2

source activate py2
pip install --upgrade pip==19.0.1

# TFX packages only supports python 2
pip --no-cache-dir install \
  ipykernel \
  ${TF_PACKAGE_PY_27} \
  tensorflow-transform \
  tensorflow-serving-api===${TF_SERVING_VERSION}

python -m ipykernel install

# TODO(jlewi): Does TFDV not have jupyter extensions?
if [[ $TFDV_VERSION ]]; then
  pip install --no-cache-dir tensorflow-data-validation==$TFDV_VERSION
fi

# tensorflow-model-analysis is only supported for TF 1.6 and above
# TODO temporarily remove tensorflow-model-analysis because of gpu problem
# https://github.com/kubeflow/kubeflow/pull/1759
if [[ $TFMA_VERSION ]]; then
  # if you find any dependency problems in the future
  # please visit https://github.com/tensorflow/model-analysis#compatible-versions
  # and fix the TFA_VERSION with compatible version number in the config json
  pip install --no-cache-dir tensorflow-model-analysis==$TFMA_VERSION
  # We use --system because if we don't the config is written to the home directory
  # and the changes are lost when we mount a PV over them.
  jupyter nbextension enable --py --system widgetsnbextension
fi

# TODO a quick fix for tensorflow_serving_api when install gpu
# https://github.com/tensorflow/serving/issues/1142
# now the dep in tensorflow can meet the require of tensorflow-serving-api but not ensure future
pip install --no-cache-dir --no-deps tensorflow-serving-api

# Install jupyterlab-manager
# nodejs required for jupyterlab-manager
conda install --quiet --yes nodejs
jupyter labextension install @jupyter-widgets/jupyterlab-manager

# Install common packages from requirements.txt for both python2 and python
pip --no-cache-dir install -r /tmp/requirements.txt
source activate py2
pip --no-cache-dir install -r /tmp/requirements.txt

# Do chown in this layer for significant size savings
chown -R ${NB_USER}:users $HOME
chown -R ${NB_USER}:users $CONDA_DIR

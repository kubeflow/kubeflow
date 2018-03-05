#!/bin/bash
# Copyright 2018 The Kubeflow Authors All rights reserved.
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

set -e

CONDA_DIR="${CONDA_DIR:-/opt/conda}"
PATH="${CONDA_DIR}/bin:$PATH"
SHELL="${SHELL:-/bin/bash}"
NB_USER="${NB_USER:-jovyan}"
NB_UID="${NB_UID:-1000}"
HOME="${HOME:-/home/${NB_USER}}"
LC_ALL="${LC_ALL:-en_US.UTF-8}"
LANG="${LANG:-en_US.UTF-8}"
LANGUAGE="${LANGUAGE:-en_US.UTF-8}"
MINICONDA_VERSION="${MINICONDA_VERSION:-4.3.21}"
TF_PACKAGE="${TF_PACKAGE:-tf-nightly}"
CLOUD_SDK_VERSION="${CLOUD_SDK_VERSION:-168.0.0}"
XDG_CACHE_HOME="${XDG_CACHE_HOME:-/home/$NB_USER/.cache/}"

apt-get update && apt-get install -yq --no-install-recommends \
    apt-transport-https \
    build-essential \
    bzip2 \
    ca-certificates \
    curl \
    emacs \
    fonts-liberation \
    g++ \
    git \
    inkscape \
    jed \
    libav-tools \
    libcupti-dev \
    libsm6 \
    libxext-dev \
    libxrender1 \
    lmodern \
    locales \
    lsb-release \
    openssh-client \
    pandoc \
    pkg-config \
    python \
    python-dev \
    sudo \
    unzip \
    vim \
    wget \
    zip \
    zlib1g-dev

echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
locale-gen

# Install Tini
wget --quiet https://github.com/krallin/tini/releases/download/v0.10.0/tini && \
    echo "1361527f39190a7338a0b434bd8c88ff7233ce7b9a4876f3315c22fce7eca1b0 *tini" | sha256sum -c - && \
    mv tini /usr/local/bin/tini && \
    chmod +x /usr/local/bin/tini

# Install ksonnet
wget --quiet https://github.com/ksonnet/ksonnet/releases/download/v0.8.0/ks_0.8.0_linux_amd64.tar.gz && \
    tar -zvxf ks_0.8.0_linux_amd64.tar.gz && \
    mv ks_0.8.0_linux_amd64/ks /usr/local/bin/ks && \
    chmod +x /usr/local/bin/ks

# Create the notebook user with UID=1000 and in the 'users' group
useradd -m -s /bin/bash -N -u $NB_UID $NB_USER && \
    mkdir -p $CONDA_DIR && \
    chown $NB_USER $CONDA_DIR

# Setup work directory for backward-compatibility
mkdir /home/$NB_USER/work

# Install conda as jovyan and check the md5 sum provided on the download site
cd /tmp && \
    mkdir -p $CONDA_DIR && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    echo "c1c15d3baba15bf50293ae963abef853 *Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh" | md5sum -c - && \
    /bin/bash Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh -f -b -p $CONDA_DIR && \
    rm Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    $CONDA_DIR/bin/conda config --system --prepend channels conda-forge && \
    $CONDA_DIR/bin/conda config --system --set auto_update_conda false && \
    $CONDA_DIR/bin/conda config --system --set show_channel_urls true && \
    $CONDA_DIR/bin/conda update --all

# Install Jupyter Notebook and Hub
conda install --quiet --yes \
    'notebook=5.0.*' \
    'jupyterhub=0.8.1' \
    'jupyterlab=0.31.*'

# Install CUDA Profile Tools and other python packages
pip --no-cache-dir install \
    Pillow \
    h5py \
    ipykernel \
    matplotlib \
    numpy \
    scipy \
    sklearn \
    kubernetes \
    grpcio \
    ktext \
    annoy \
    nltk \
    pydot \
    pydot-ng \
    graphviz \
    && \
    python -m ipykernel.kernelspec

# Install Python 3 packages
# Remove pyqt and qt pulled in for matplotlib since we're only ever going to
# use notebook-friendly backends in these images
conda install --quiet --yes \
    'nomkl' \
    'ipywidgets=6.0*' \
    'pandas=0.22*' \
    'numexpr=2.6*' \
    'matplotlib=2.0*' \
    'scipy=0.19*' \
    'seaborn=0.7*' \
    'scikit-learn=0.18*' \
    'scikit-image=0.12*' \
    'sympy=1.0*' \
    'cython=0.25*' \
    'patsy=0.4*' \
    'statsmodels=0.8*' \
    'cloudpickle=0.2*' \
    'dill=0.2*' \
    'numba=0.31*' \
    'bokeh=0.12*' \
    'sqlalchemy=1.1*' \
    'hdf5=1.8.17' \
    'h5py=2.6*' \
    'vincent=0.4.*' \
    'beautifulsoup4=4.5.*' \
    'xlrd'  && \
    conda remove --quiet --yes --force qt pyqt

# Install graphviz package
apt-get update && apt-get install -yq --no-install-recommends graphviz

# Install Python 3 Tensorflow
pip install --quiet --no-cache-dir "${TF_PACKAGE}"

# Install the Cloud SDK
export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb https://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" > /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update && \
    apt-get install -y google-cloud-sdk=${CLOUD_SDK_VERSION}-0 kubectl && \
    gcloud config set core/disable_usage_reporting true && \
    gcloud config set component_manager/disable_update_check true && \
    gcloud config set metrics/environment github_docker_image

# Activate ipywidgets extension in the environment that runs the notebook server
jupyter nbextension enable --py widgetsnbextension --sys-prefix

# Install Bazel
curl -L -o bazel.sh https://github.com/bazelbuild/bazel/releases/download/0.8.0/bazel-0.8.0-installer-linux-x86_64.sh && \
    chmod a+x ./bazel.sh && ./bazel.sh && rm ./bazel.sh

# Include the Tensorflow models and benchmarks repos
git clone https://github.com/tensorflow/models.git /home/$NB_USER/tensorflow-models && \
    git clone https://github.com/tensorflow/benchmarks.git /home/$NB_USER/tensorflow-benchmarks

# Install TensorBoard
pip install jupyter-tensorboard

# Create a conda environment for Python 2. We want to include as many of the
# packages from our root environment as we reasonably can, so we explicitly
# list that environment, then include everything unless it is Conda (which
# can only be in the root environment), Jupyterhub (which requires Python 3),
# or Python itself. We also want to include the pip packages, but we cannot
# install those via conda, so we list them, drop any conda packages, and
# then install them via pip. We do this on a best-effort basis, so if any
# packages from the Python 3 environment cannot be installed with Python 2,
# then we just skip them.
conda_packages=$(conda list -e | cut -d '=' -f 1 | grep -v '#' | sort) && \
    pip_packages=$(pip --no-cache-dir list --format=freeze | cut -d '=' -f 1 | grep -v '#' | sort) && \
    pip_only_packages=$(comm -23 <(echo "${pip_packages}") <(echo "${conda_packages}")) && \
    conda create -n ipykernel_py2 python=2 --file <(echo "${conda_packages}" | grep -v conda | grep -v python | grep -v jupyterhub) && \
    source activate ipykernel_py2 && \
    python -m ipykernel install --user && \
    echo "${pip_only_packages}" | xargs -n 1 -I "{}" /bin/bash -c 'pip install --no-cache-dir {} || true' && \
    pip install --no-cache-dir tensorflow-transform && \
    source deactivate

# Clean up the package information used by apt and conda
apt-get clean
rm -rf /var/lib/apt/lists/*
conda clean -tipsy

# Set the file ownership for the home directory correctly.
chown -R $NB_USER /home/$NB_USER/

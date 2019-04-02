# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

ARG BASE_IMAGE=ubuntu:18.04@sha256:de774a3145f7ca4f0bd144c7d4ffb2931e06634f11529653b23eba85aef8e378

FROM $BASE_IMAGE

ARG TF_PACKAGE=https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.7.0-cp36-cp36m-linux_x86_64.whl
ARG TF_PACKAGE_PY_27=https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.7.0-cp27-none-linux_x86_64.whl
ARG TF_SERVING_VERSION=0.0.0
ARG TFMA_VERSION
ARG TFDV_VERSION
ARG PIPELINE_SDK_PACKAGE=https://storage.googleapis.com/ml-pipeline/release/0.1.8/kfp.tar.gz

USER root

ENV DEBIAN_FRONTEND noninteractive

ENV NB_USER jovyan
ENV NB_UID 1000
ENV HOME /home/$NB_USER
ENV NB_PREFIX /
# We prefer to have a global conda install
# to minimize the amount of content in $HOME
ENV CONDA_DIR=/opt/conda
ENV PATH $CONDA_DIR/bin:$PATH

# Export args as environment variables.
# This is solely to make them available to install.sh
ENV TF_PACKAGE $TF_PACKAGE
ENV TF_PACKAGE_27 $TF_PACKAGE_PY_27
ENV TF_SERVING_VERSION $TF_PACKAGE_PY_27
ENV TFMA_VERSION $TFMA_VERSION
ENV TFDV_VERSION $TFDV_VERSION
ENV PIPELINE_SDK_PACKAGE $PIPELINE_SDK_PACKAGE

# Use bash instead of sh
SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get install -yq --no-install-recommends \
  apt-transport-https \
  build-essential \
  bzip2 \
  ca-certificates \
  curl \
  g++ \
  git \
  gnupg \
  graphviz \
  locales \
  lsb-release \
  openssh-client \
  sudo \
  unzip \
  vim \
  wget \
  zip \
  && apt-get clean && \
  rm -rf /var/lib/apt/lists/*

ENV DOCKER_CREDENTIAL_GCR_VERSION=1.4.3
RUN curl -LO https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${DOCKER_CREDENTIAL_GCR_VERSION}/docker-credential-gcr_linux_amd64-${DOCKER_CREDENTIAL_GCR_VERSION}.tar.gz && \
    tar -zxvf docker-credential-gcr_linux_amd64-${DOCKER_CREDENTIAL_GCR_VERSION}.tar.gz && \
    mv docker-credential-gcr /usr/local/bin/docker-credential-gcr && \
    rm docker-credential-gcr_linux_amd64-${DOCKER_CREDENTIAL_GCR_VERSION}.tar.gz && \
    chmod +x /usr/local/bin/docker-credential-gcr

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Create jovyan user with UID=1000 and in the 'users' group
# but allow for non-initial launches of the notebook to have
# $HOME provided by the contents of a PV
RUN useradd -M -s /bin/bash -N -u $NB_UID $NB_USER && \
    chown -R ${NB_USER}:users /usr/local/bin && \
    mkdir -p $HOME

RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb https://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" > /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update && \
    apt-get install -y google-cloud-sdk kubectl

# Install Tini - used as entrypoint for container
RUN cd /tmp && \
    wget --quiet https://github.com/krallin/tini/releases/download/v0.18.0/tini && \
    echo "12d20136605531b09a2c2dac02ccee85e1b874eb322ef6baf7561cd93f93c855 *tini" | sha256sum -c - && \
    mv tini /usr/local/bin/tini && \
    chmod +x /usr/local/bin/tini

# Install conda as jovyan user and check the md5 sum provided on the download site
# After Miniconda v4.5.4 the default Python version is no longer 3.6, but TensorFlow
# still doesn't support Python 3.7. If we still like to upgrade Miniconda we need
# to add the line "conda install python==3.6" to RUN command below
ENV MINICONDA_VERSION 4.5.4
RUN cd /tmp && \
    mkdir -p $CONDA_DIR && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    echo "a946ea1d0c4a642ddf0c3a26a18bb16d *Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh" | md5sum -c - && \
    /bin/bash Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh -f -b -p ${CONDA_DIR} && \
    rm Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    conda config --system --prepend channels conda-forge && \
    conda config --system --set auto_update_conda false && \
    conda config --system --set show_channel_urls true && \
    conda update --all && \
    conda update conda && \
    conda clean -tipsy

# NOTE: Beyond this point be careful of breaking out
# or otherwise adding new layers with RUN, chown, etc.
# The image size can grow significantly.

# Install base python3 packages
RUN pip install --upgrade pip==19.0.1 && \
    pip --no-cache-dir install \
    # Tensorflow
    ${TF_PACKAGE} \
    # Jupyter Stuff
    jupyter \
    jupyter-console==6.0.0 \
    jupyterhub \
    jupyterlab \
    xgboost \
    git+https://github.com/kubeflow/fairing@bd8313d9a4e4dd3b69a840e7cf0ea0d2326d720e \
    # Kubeflow pipeline SDK
    ${PIPELINE_SDK_PACKAGE} \
    # Cleanup
    && conda clean -tipsy

# NB: the COPY chown can't expand a bash variable for NB_USER
COPY --chown=jovyan:users requirements.txt /tmp

# Install python2 and ipython2 kernel for jupyter notebook
# Install tf packages which only support py2
COPY --chown=jovyan:users install.sh /tmp/
RUN chmod a+rx /tmp/install.sh && \
    /tmp/install.sh

# Add basic config
COPY --chown=jovyan:users  jupyter_notebook_config.py /tmp

# Wipe $HOME for PVC detection later
WORKDIR $HOME
RUN rm -fr $(ls -A $HOME)

# Copy over init scripts
COPY --chown=jovyan:users  pvc-check.sh /usr/local/bin/
RUN chmod a+rx /usr/local/bin/*

RUN docker-credential-gcr configure-docker && chown jovyan:users $HOME/.docker/config.json

# Configure container startup
EXPOSE 8888
USER jovyan
ENTRYPOINT ["tini", "--"]
CMD ["sh","-c", "jupyter notebook --notebook-dir=/home/jovyan --ip=0.0.0.0 --no-browser --allow-root --port=8888 --NotebookApp.token='' --NotebookApp.password='' --NotebookApp.allow_origin='*' --NotebookApp.base_url=${NB_PREFIX}"]


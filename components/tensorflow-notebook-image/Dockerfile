# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

ARG BASE_IMAGE=ubuntu:latest

FROM $BASE_IMAGE

ARG INSTALL_TFMA=yes
ARG TF_PACKAGE=https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.7.0-cp36-cp36m-linux_x86_64.whl
ARG TF_PACKAGE_PY_27=https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.7.0-cp27-none-linux_x86_64.whl

USER root

ENV DEBIAN_FRONTEND noninteractive

ENV NB_USER jovyan
ENV NB_UID 1000
ENV HOME /home/$NB_USER
# We prefer to have a global conda install
# to minimize the amount of content in $HOME
ENV CONDA_DIR=/opt/conda
ENV PATH $CONDA_DIR/bin:$PATH

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
    wget --quiet https://github.com/krallin/tini/releases/download/v0.10.0/tini && \
    echo "1361527f39190a7338a0b434bd8c88ff7233ce7b9a4876f3315c22fce7eca1b0 *tini" | sha256sum -c - && \
    mv tini /usr/local/bin/tini && \
    chmod +x /usr/local/bin/tini

# Install conda as jovyan user and check the md5 sum provided on the download site
ENV MINICONDA_VERSION 4.4.10
RUN cd /tmp && \
    mkdir -p $CONDA_DIR && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    echo "bec6203dbb2f53011e974e9bf4d46e93 *Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh" | md5sum -c - && \
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
RUN pip install --upgrade pip && \
    pip --no-cache-dir install \
    # Tensorflow
    ${TF_PACKAGE} \
    # Jupyter Stuff
    jupyter \
    jupyterhub \
    jupyterlab \
    # Cleanup
    && conda clean -tipsy

# Install python2 and ipython2 kernel for jupyter notebook
# Install tf packages which only support py2
RUN conda create -n py2 python=2 && \
    source activate py2 && \
    pip install --upgrade pip && \
    pip --no-cache-dir install \
    ipykernel \
    # Tensorflow
    ${TF_PACKAGE_PY_27} \
    # Tensorflow packages which only supports python 2
    tensorflow-transform \
    tensorflow-serving-api \
    # ipykernel for python 2 jupyter notebook kernel
    && \
    python -m ipykernel install && \
    # tensorflow-model-analysis is only supported for TF 1.6 and above
    if [[ $INSTALL_TFMA == "yes" ]]; then \
      pip install --no-cache-dir tensorflow-model-analysis && \
      jupyter nbextension install --py --symlink tensorflow_model_analysis && \
      jupyter nbextension enable --py tensorflow_model_analysis ; \
    fi \
    && \
    # Install jupyterlab-manager
    conda install --quiet --yes \
    # nodejs required for jupyterlab-manager
    nodejs && \
    jupyter labextension install @jupyter-widgets/jupyterlab-manager && \
    # Do chown in this layer for significant size savings
    chown -R ${NB_USER}:users $HOME && \
    chown -R ${NB_USER}:users $CONDA_DIR

# Install common packages from requirements.txt for both python2 and python3
# NB: the COPY chown can't expand a bash variable for NB_USER
COPY --chown=jovyan:users requirements.txt /tmp
COPY --chown=jovyan:users  jupyter_notebook_config.py /tmp
RUN pip --no-cache-dir install -r /tmp/requirements.txt && \
    source activate py2 && \
    pip --no-cache-dir install -r /tmp/requirements.txt

# Wipe $HOME for PVC detection later
WORKDIR $HOME
RUN rm -fr $(ls -A $HOME)

# Copy over init scripts
COPY --chown=jovyan:users start-singleuser.sh start-notebook.sh start.sh pvc-check.sh /usr/local/bin/
RUN chmod a+rx /usr/local/bin/*

# Configure container startup
EXPOSE 8888
ENTRYPOINT ["tini", "--"]
CMD ["start-notebook.sh"]

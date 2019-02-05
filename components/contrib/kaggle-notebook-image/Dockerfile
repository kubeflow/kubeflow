# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

# use basic syntax for now
FROM gcr.io/kaggle-images/python:latest

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

# add https support
RUN apt-get update && apt-get install -yq --no-install-recommends apt-transport-https

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
    apt-get install -y google-cloud-sdk kubectl && \
    # pin to 0.8.1 due to conflicts with tornado>=5.x and pyzmq>=17.x
    # we just really need jupyterhub-singleuser for our KF scripts
    pip install jupyterhub==0.8.1 \
    # Kaggle image doesn't include their own API package (yet)
    kaggle

# Install Tini - used as entrypoint for container
RUN cd /tmp && \
    wget --quiet https://github.com/krallin/tini/releases/download/v0.18.0/tini && \
    echo "12d20136605531b09a2c2dac02ccee85e1b874eb322ef6baf7561cd93f93c855 *tini" | sha256sum -c - && \
    mv tini /usr/local/bin/tini && \
    chmod +x /usr/local/bin/tini

RUN chown -R ${NB_USER}:users $HOME

ENV GITHUB_REF https://raw.githubusercontent.com/kubeflow/kubeflow/master/components/tensorflow-notebook-image

ADD --chown=jovyan:users $GITHUB_REF/jupyter_notebook_config.py /tmp

# Wipe $HOME for PVC detection later
WORKDIR $HOME
RUN rm -fr $(ls -A $HOME)

# Get init scripts from kubeflow
ADD --chown=jovyan:users \
    $GITHUB_REF/start-singleuser.sh \
    $GITHUB_REF/start-notebook.sh \
    $GITHUB_REF/start.sh \
    $GITHUB_REF/pvc-check.sh \
    /usr/local/bin/

RUN chmod a+rx /usr/local/bin/*

# Configure container startup
EXPOSE 8888
ENTRYPOINT ["tini", "--"]
CMD ["start-notebook.sh"]

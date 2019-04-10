FROM nvcr.io/nvidia/rapidsai/rapidsai:cuda9.2_ubuntu16.04

USER root

ENV DEBIAN_FRONTEND noninteractive

ENV NB_USER jovyan
ENV NB_UID 1000
ENV HOME /home/$NB_USER
# We prefer to have a global conda install
# to minimize the amount of content in $HOME
ENV CONDA_DIR=/conda
ENV PATH $CONDA_DIR/bin:$PATH
ENV PATH $CONDA_DIR/envs/rapids/bin:$PATH
# anticipate a default GKE nvidia mount
ENV PATH /usr/local/nvidia/bin:$PATH

# Use bash instead of sh
SHELL ["/bin/bash", "-c"]

# add https support
RUN apt-get update && apt-get install -yq --no-install-recommends \
    apt-transport-https locales lsb-release wget

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Replace jupyter user with jovyan user UID=1000 and in the 'users' group
# but allow for non-initial launches of the notebook to have
# $HOME provided by the contents of a PV
RUN userdel jupyter && \
    useradd -M -s /bin/bash -N -u $NB_UID $NB_USER && \
    chown -R ${NB_USER}:users /usr/local/bin && \
    chown -R ${NB_USER}:users $CONDA_DIR && \
    chown -R ${NB_USER}:users /rapids && \
    mkdir -p $HOME

RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb https://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" > /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update && \
    apt-get install -y google-cloud-sdk kubectl && \
    # Install to the existing RapidsAI conda env
    source activate rapids && \
    pip install --upgrade pip==19.0.1 && \
    pip --no-cache-dir install jupyterhub matplotlib

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
    $GITHUB_REF/start-notebook.sh \
    $GITHUB_REF/start-singleuser.sh \
    $GITHUB_REF/start.sh \
    $GITHUB_REF/pvc-check.sh \
    /usr/local/bin/

RUN chmod a+rx /usr/local/bin/*

# HACK: GKE late-binding of NVIDIA driver mount
# seems to leave us with a stale cache for the CUDA libs;
# cudf librmm.so can't find libcuda* from LD_LIBRARY_PATH
RUN chown -R ${NB_USER}:users /etc
RUN sed -i '/JUPYTERHUB_API_TOKEN/i\ldconfig' /usr/local/bin/start-notebook.sh

# Configure container startup
EXPOSE 8888
ENTRYPOINT ["tini", "--"]
CMD ["start-notebook.sh"]

ARG BASE_IMAGE=jupyter/base-notebook:latest
FROM $BASE_IMAGE

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

# build tools for auto-sklearn
RUN apt-get update && apt-get install -yq --no-install-recommends \
    build-essential \
    git \
    unzip \
    curl \
    python-dev \
    swig && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN conda install --quiet --yes \
    "cython=0.29.*" \
    && \
    conda clean --all -f -y && \
    fix-permissions $CONDA_DIR && \
    fix-permissions /home/$NB_USER

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Allow for non-initial launches of the notebook to have
# $HOME provided by the contents of a PV
RUN chown -R ${NB_USER}:users /usr/local/bin && \
    chown -R ${NB_USER}:users $CONDA_DIR && \
    chown -R ${NB_USER}:users $HOME

# Install:
# - Seldon Core - platform to deploy machine learning models
# - Papermill - tool for parameterizing and executing Jupyter Notebooks
# - auto-sklearn - toolkit for automated machine learning
# - Featuretools -  library for automated feature engineering
# - Platiagro SDK - helper functions to build components
# - Custom Jupyter Notebook and Jupyter Lab
RUN pip install --no-cache-dir \
    seldon-core==1.0.2 \
    papermill[s3]==2.1.1 \
    auto-sklearn==0.6.0 \
    featuretools==0.13.4 \
    git+https://github.com/platiagro/sdk.git@master \
    git+https://github.com/platiagro/notebook.git@platiagro \
    && \
    cd /opt && \
    wget --quiet https://github.com/platiagro/jupyterlab/archive/platiagro.zip && \
    unzip -q platiagro.zip && \
    cd jupyterlab-platiagro && \
    pip install -e . && \
    jlpm install && \
    jlpm run build && \
    rm ../platiagro.zip && \
    rm -rf /home/$NB_USER/.cache/yarn && \
    fix-permissions $CONDA_DIR && \
    fix-permissions /home/$NB_USER

# Configure container startup
EXPOSE 8888
USER jovyan

# Export MinIO credentials - required for Papermill and PlatIAgro SDK
ENV BOTO3_ENDPOINT_URL=http://minio-service.kubeflow:9000
ENV AWS_ACCESS_KEY_ID=minio
ENV AWS_SECRET_ACCESS_KEY=minio123

ENTRYPOINT ["tini", "--"]
CMD ["sh", "-c", "jupyter lab --dev-mode --notebook-dir=/home/${NB_USER} --ip=0.0.0.0 --no-browser --allow-root --port=8888 --NotebookApp.token='' --NotebookApp.password='' --NotebookApp.allow_origin='*' --NotebookApp.base_url=${NB_PREFIX}"]

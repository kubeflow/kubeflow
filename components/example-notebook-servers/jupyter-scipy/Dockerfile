#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter>
FROM $BASE_IMG

# install - usefull linux packages
USER root
RUN apt-get -yq update \
 && apt-get -yq install --no-install-recommends \
    # for latex
    cm-super \
    dvipng \
    # for matplotlib
    ffmpeg \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
USER $NB_UID

# install - conda packages
# NOTE: we use mamba to speed things up
RUN mamba install -y -q \
    altair \
    beautifulsoup4==4.13.3 \
    bokeh==3.6.3 \
    bottleneck \
    brotli \
    cloudpickle \
    dask==2024.12.1 \
    dill \
    h5py \
    ipympl \
    matplotlib==3.10.0 \
    numba \
    numexpr \
    numpy==1.26.4 \
    openblas==0.3.28 \
    openpyxl \
    pandas==2.2.3 \
    patsy \
    protobuf \
    pytables==3.10.2 \
    scikit-image==0.25.1 \
    scikit-learn==1.6.1 \
    scipy==1.15.1 \
    seaborn==0.13.2 \
    sqlalchemy==2.0.38 \
    statsmodels \
    sympy \
    vincent \
    xgboost==2.1.4 \
    xlrd \
 && mamba clean -a -f -y

# install - requirements.txt
COPY --chown=${NB_USER}:${NB_GID} requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt
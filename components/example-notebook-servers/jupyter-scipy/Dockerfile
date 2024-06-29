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
    beautifulsoup4==4.12.3 \
    bokeh==3.3.4 \
    bottleneck \
    brotli \
    cloudpickle \
    dask==2024.5.1 \
    dill \
    h5py \
    ipympl \
    matplotlib==3.8.4 \
    numba \
    numexpr \
    openblas==0.3.25 \
    openpyxl \
    pandas==2.1.4 \
    patsy \
    protobuf \
    pytables==3.9.2 \
    scikit-image==0.22.0 \
    scikit-learn==1.3.2 \
    scipy==1.11.3 \
    seaborn==0.13.2 \
    sqlalchemy==2.0.30 \
    statsmodels \
    sympy \
    vincent \
    xlrd \
 && mamba clean -a -f -y

# install - requirements.txt
COPY --chown=${NB_USER}:${NB_GID} requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt
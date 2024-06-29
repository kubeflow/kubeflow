#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter-pytorch>
FROM $BASE_IMG

# install - conda packages
# NOTE: we use mamba to speed things up
RUN mamba install -y -q \
    bokeh==3.3.4 \
    cloudpickle==2.2.1 \
    dill==0.3.8 \
    ipympl==0.9.4 \
    matplotlib==3.8.4 \
    numpy==1.24.4 \
    pandas==2.1.4 \
    scikit-image==0.22.0 \
    scikit-learn==1.3.2 \
    scipy==1.11.3 \
    seaborn==0.13.2 \
    xgboost==1.7.6 \
 && mamba clean -a -f -y

# install - requirements.txt
COPY --chown=${NB_USER}:${NB_GID} requirements.txt /tmp/requirements.txt
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt
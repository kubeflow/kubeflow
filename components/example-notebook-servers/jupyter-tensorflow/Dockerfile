#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter>
FROM $BASE_IMG

# args - software versions
ARG TENSORFLOW_VERSION=2.13.0

# install - tensorflow
# TODO: remove `h5py` pin when upstream ARM wheels are available again:
#       https://github.com/h5py/h5py/issues/2408
RUN python3 -m pip install --quiet --no-cache-dir \
    h5py==3.10.0 \
    tensorflow==${TENSORFLOW_VERSION}

# install - requirements.txt
COPY --chown=${NB_USER}:users requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt
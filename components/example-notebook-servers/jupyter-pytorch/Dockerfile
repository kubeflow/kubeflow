#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter>
FROM $BASE_IMG

# args - software versions
# https://github.com/pytorch/pytorch/releases
# https://github.com/pytorch/audio/releases
# https://github.com/pytorch/vision/releases
# NOTE: correct version alignments are found at https://pytorch.org/get-started/previous-versions/
#       they sometimes forget to publish a github release of `torchaudio` or `torchvision` when the cut a
#       patch release of `torch`, but they still publish a patch of `torchaudio` and `torchvision` on pypi
ARG PYTORCH_VERSION=2.5.1
ARG TORCHAUDIO_VERSION=2.5.1
ARG TORCHVISION_VERSION=0.20.1

# install - pytorch (cpu)
RUN python3 -m pip install --quiet --no-cache-dir --index-url https://download.pytorch.org/whl/cpu --extra-index-url https://pypi.org/simple \
    torch==${PYTORCH_VERSION} \
    torchaudio==${TORCHAUDIO_VERSION} \
    torchvision==${TORCHVISION_VERSION}

# install - requirements.txt
COPY --chown=${NB_USER}:${NB_GID} requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt
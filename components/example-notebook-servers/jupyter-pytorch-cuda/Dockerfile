#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter>
FROM $BASE_IMG

# args - software versions
# https://github.com/pytorch/pytorch/releases
# https://github.com/pytorch/audio/releases
# https://github.com/pytorch/vision/releases
ARG PYTORCH_VERSION=2.3.1
ARG TORCHAUDIO_VERSION=2.3.1
ARG TORCHVISION_VERSION=0.18.1

# nvidia container toolkit
# https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/docker-specialized.html
ENV NVIDIA_VISIBLE_DEVICES all
ENV NVIDIA_DRIVER_CAPABILITIES compute,utility
ENV NVIDIA_REQUIRE_CUDA "cuda>=12.1"

# install - pytorch (cuda)
RUN python3 -m pip install --quiet --no-cache-dir --index-url https://download.pytorch.org/whl/cu121 \
    torch==${PYTORCH_VERSION} \
    torchaudio==${TORCHAUDIO_VERSION} \
    torchvision==${TORCHVISION_VERSION}

# install - requirements.txt
COPY --chown=${NB_USER}:${NB_GID} requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt
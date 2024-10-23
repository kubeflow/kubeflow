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

# args - rocm versions
ARG ROCM_VERSION=6.0
ARG AMDGPU_VERSION=6.0

# install - rocm & support libraries
USER root
ARG APT_PREF="Package: *\\nPin: release o=repo.radeon.com\\nPin-Priority: 600"
RUN echo -e "$APT_PREF" > /etc/apt/preferences.d/rocm-pin-600
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ca-certificates curl libnuma-dev gnupg \
  && curl -sL https://repo.radeon.com/rocm/rocm.gpg.key | apt-key add - \
  && printf "deb [arch=amd64] https://repo.radeon.com/rocm/apt/$ROCM_VERSION/ jammy main" | tee /etc/apt/sources.list.d/rocm.list \
  && printf "deb [arch=amd64] https://repo.radeon.com/amdgpu/$AMDGPU_VERSION/ubuntu jammy main" | tee /etc/apt/sources.list.d/amdgpu.list \
  && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  libelf1 \
  kmod \
  file \
  rocm-dev \
  build-essential && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# config - user permissions
RUN usermod -aG video $NB_USER

USER $NB_UID

# install - pytorch (rocm)
RUN python3 -m pip install --quiet --no-cache-dir --index-url https://download.pytorch.org/whl/rocm6.0/ \
    torch==${PYTORCH_VERSION} \
    torchaudio==${TORCHAUDIO_VERSION} \
    torchvision==${TORCHVISION_VERSION}

# install - requirements.txt
COPY --chown=${NB_USER}:${NB_GID} requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt

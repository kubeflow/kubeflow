#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter>
FROM $BASE_IMG

# Content below is based on the scripts/Dockerfiles here:
# https://github.com/HabanaAI/Setup_and_Install/blob/1.17.1/dockerfiles/base/Dockerfile.ubuntu22.04
# https://github.com/HabanaAI/Setup_and_Install/blob/1.17.1/dockerfiles/pytorch/Dockerfile.ubuntu

# args - gaudi version
ARG GAUDI_VERSION=1.17.1
ARG GAUDI_REVISION=40

# args - software versions
# see this support matrix for compatible versions:
# https://docs.habana.ai/en/latest/Support_Matrix/Support_Matrix.html
ARG AWS_EFA_VERSION=1.29.0
ARG HCCL_OFI_WRAPPER_VERSION=1.18.0
ARG LIBFABRIC_VERSION=1.20.0
ARG PYTORCH_VERSION=2.3.1

# Gaudi 1.17 does not currently support Python 3.11, so we downgrade to 3.10
# https://docs.habana.ai/en/latest/Support_Matrix/Support_Matrix.html
ARG PYTHON_VERSION=3.10.14
RUN sed -i "s/python ==.*/python ==${PYTHON_VERSION}/" ${CONDA_DIR}/conda-meta/pinned \
 && conda install -y -q \
    python==${PYTHON_VERSION} \
 && conda clean -a -f -y

USER root

# install - support libraries
RUN export DEBIAN_FRONTEND=noninteractive \
 && apt-get update -yq \
 && apt-get install -yq --no-install-recommends \
    apt-utils \
    bc \
    build-essential \
    graphviz \
    iproute2 \
    libcairo2-dev \
    libgl1 \
    libglib2.0-dev \
    libgnutls30 \
    libgoogle-glog0v5 \
    libgoogle-perftools-dev \
    libhdf5-dev \
    libjemalloc2 \
    libjpeg-dev \
    liblapack-dev \
    libmkl-dev \
    libnuma-dev \
    libopenblas-dev \
    libpcre2-dev \
    libpq-dev \
    libselinux1-dev \
    lsof \
    moreutils \
    numactl \
    protobuf-compiler \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV LD_PRELOAD=/lib/x86_64-linux-gnu/libtcmalloc.so.4

# install - elastic fabric adapter
# NOTE: we use a temporary GNUPGHOME to avoid polluting the user's HOME with root-owned files
RUN export GNUPGHOME=$(mktemp -d) \
 && curl -fsSL "https://efa-installer.amazonaws.com/aws-efa-installer-$AWS_EFA_VERSION.tar.gz" -o /tmp/aws-efa-installer.tar.gz \
 && curl -fsSL "https://efa-installer.amazonaws.com/aws-efa-installer-$AWS_EFA_VERSION.tar.gz.sig" -o /tmp/aws-efa-installer.tar.gz.sig \
 && curl -fsSL "https://efa-installer.amazonaws.com/aws-efa-installer.key" | gpg --import \
 && gpg --verify /tmp/aws-efa-installer.tar.gz.sig /tmp/aws-efa-installer.tar.gz \
 && tar xzf /tmp/aws-efa-installer.tar.gz -C /tmp \
 && cd /tmp/aws-efa-installer \
 && export DEBIAN_FRONTEND=noninteractive \
 && apt-get -yq update \
 && ./efa_installer.sh -y --skip-kmod --skip-limit-conf --no-verify \
 && rm -rf /etc/ld.so.conf.d/efa.conf /etc/profile.d/efa.sh \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && rm -rf /tmp/aws-efa-installer.tar.gz /tmp/aws-efa-installer.tar.gz.sig /tmp/aws-efa-installer \
 && rm -rf "${GNUPGHOME}"

# config - fabric adapter and mpi variables
ENV MPI_ROOT=/opt/amazon/openmpi
ENV PATH=${MPI_ROOT}/bin:${PATH}
ENV MPICC=${MPI_ROOT}/bin/mpicc
ENV OPAL_PREFIX=${MPI_ROOT}
ENV RDMAV_FORK_SAFE=1
ENV FI_EFA_USE_DEVICE_RDMA=1
ENV LD_LIBRARY_PATH=${MPI_ROOT}/lib

# install - habana packages
RUN curl -fsSL "https://vault.habana.ai/artifactory/api/gpg/key/public" | gpg --dearmor -o /usr/share/keyrings/habana-artifactory.gpg \
 && chown root:root /usr/share/keyrings/habana-artifactory.gpg \
 && chmod 644 /usr/share/keyrings/habana-artifactory.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/habana-artifactory.gpg] https://vault.habana.ai/artifactory/debian jammy main" | tee /etc/apt/sources.list.d/habana.list \
 && export DEBIAN_FRONTEND=noninteractive \
 && apt-get update -yq \
 && apt-get install -yq --no-install-recommends \
    habanalabs-firmware-tools="${GAUDI_VERSION}"-"${GAUDI_REVISION}" \
    habanalabs-graph="${GAUDI_VERSION}"-"${GAUDI_REVISION}" \
    habanalabs-rdma-core="${GAUDI_VERSION}"-"${GAUDI_REVISION}" \
    habanalabs-thunk="${GAUDI_VERSION}"-"${GAUDI_REVISION}" \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# config - habana variables
ENV RDMA_CORE_ROOT=/opt/habanalabs/rdma-core/src
ENV RDMA_CORE_LIB=${RDMA_CORE_ROOT}/build/lib
ENV GC_KERNEL_PATH=/usr/lib/habanalabs/libtpc_kernels.so
ENV HABANA_LOGS=/var/log/habana_logs/
ENV HABANA_SCAL_BIN_PATH=/opt/habanalabs/engines_fw
ENV HABANA_PLUGINS_LIB_PATH=/opt/habanalabs/habana_plugins
ENV DATA_LOADER_AEON_LIB_PATH=/usr/lib/habanalabs/libaeon.so
ENV LD_LIBRARY_PATH=/usr/lib/habanalabs:${LD_LIBRARY_PATH}

# install - libfabric
ENV LIBFABRIC_ROOT="/opt/habanalabs/libfabric-${LIBFABRIC_VERSION}"
RUN curl -fsSL "https://github.com/ofiwg/libfabric/releases/download/v${LIBFABRIC_VERSION}/libfabric-${LIBFABRIC_VERSION}.tar.bz2" -o /tmp/libfabric-${LIBFABRIC_VERSION}.tar.bz2 \
 && tar xjf /tmp/libfabric-${LIBFABRIC_VERSION}.tar.bz2 -C /tmp \
 && cd /tmp/libfabric-${LIBFABRIC_VERSION} \
 && ./configure --prefix=${LIBFABRIC_ROOT} --enable-psm3-verbs --enable-verbs=yes --with-synapseai=/usr \
 && make -j \
 && make install \
 && cd / \
 && rm -rf /tmp/libfabric-${LIBFABRIC_VERSION}.tar.bz2 /tmp/libfabric-${LIBFABRIC_VERSION}

# config - add libfabric to loadable libraries
ENV LD_LIBRARY_PATH="/opt/habanalabs/libfabric-${LIBFABRIC_VERSION}/lib:${LD_LIBRARY_PATH}"
ENV PATH="/opt/habanalabs/libfabric-${LIBFABRIC_VERSION}/bin:${PATH}"

# install - hccl wrapper for ofi
RUN curl -fsSL "https://github.com/HabanaAI/hccl_ofi_wrapper/archive/refs/tags/v${HCCL_OFI_WRAPPER_VERSION}.tar.gz" -o /tmp/hccl_ofi_wrapper.tar.gz \
 && tar xzf /tmp/hccl_ofi_wrapper.tar.gz -C /tmp \
 && cd /tmp/hccl_ofi_wrapper-${HCCL_OFI_WRAPPER_VERSION} \
 && make \
 && cp -f libhccl_ofi_wrapper.so /usr/lib/habanalabs/libhccl_ofi_wrapper.so \
 && cd / \
 && rm -rf /tmp/hccl_ofi_wrapper.tar.gz /tmp/hccl_ofi_wrapper-v${HCCL_OFI_WRAPPER_VERSION} \
 && /sbin/ldconfig

# config - add habana modules to PYTHONPATH
ENV PYTHONPATH=/usr/lib/habanalabs

USER $NB_UID

# install - habana pytorch media modules
RUN python3 -m pip install --quiet --no-cache \
    habana_media_loader=="${GAUDI_VERSION}.${GAUDI_REVISION}"

# install - habana pytorch modules
RUN curl -fsSL "https://vault.habana.ai/artifactory/gaudi-pt-modules/${GAUDI_VERSION}/${GAUDI_REVISION}/pytorch/ubuntu2204/pytorch_modules-v${PYTORCH_VERSION}_${GAUDI_VERSION}_${GAUDI_REVISION}.tgz" -o /tmp/gaudi-pt-modules.tgz \
 && mkdir -p /tmp/gaudi-pt-modules \
 && tar xzf /tmp/gaudi-pt-modules.tgz -C /tmp/gaudi-pt-modules \
 && cd /tmp/gaudi-pt-modules \
 && PIP_QUIET=1 PIP_NO_CACHE_DIR=1 PYTHON_VERSION=3 bash install.sh ${GAUDI_VERSION} ${GAUDI_REVISION} \
 && rm -rf /tmp/gaudi-pt-modules.tgz /tmp/gaudi-pt-modules

# install - requirements.txt
COPY --chown=${NB_USER}:users requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt

# install - note about Gaudi workloads and hugepages
COPY README.md "${HOME}"

# s6 - 01-copy-tmp-home
# NOTE: the contents of $HOME_TMP are copied to $HOME at runtime
#       this is a workaround because a PVC will be mounted at $HOME
#       and the contents of $HOME will be hidden
RUN cp -p -r -T "${HOME}" "${HOME_TMP}" \
    # give group same access as user (needed for OpenShift)
 && chmod -R g=u "${HOME_TMP}"
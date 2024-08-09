#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<jupyter>
FROM $BASE_IMG

# Content below is extracted from scripts/Dockerfiles here:
# https://github.com/HabanaAI/Setup_and_Install/tree/main/dockerfiles/base
# https://github.com/HabanaAI/Setup_and_Install/tree/main/dockerfiles/pytorch

# version details
ARG ARTIFACTORY_URL=vault.habana.ai
ARG VERSION=1.16.2
ARG REVISION=2
ARG PYTORCH_VERSION=2.2.2
ARG OS_NUMBER=2204

# runtime variables
ENV DEBIAN_FRONTEND=noninteractive
ENV GC_KERNEL_PATH=/usr/lib/habanalabs/libtpc_kernels.so
ENV HABANA_LOGS=/var/log/habana_logs/
ENV HABANA_SCAL_BIN_PATH=/opt/habanalabs/engines_fw
ENV HABANA_PLUGINS_LIB_PATH=/opt/habanalabs/habana_plugins
ENV TCMALLOC_LARGE_ALLOC_REPORT_THRESHOLD=7516192768
ENV PYTHONPATH=/home/$NB_UID:/usr/lib/habanalabs/

# There is no need to store pip installation files inside docker image
ENV PIP_NO_CACHE_DIR=on
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# libfabric and scaling variables
ENV LIBFABRIC_VERSION="1.20.0"
ENV LIBFABRIC_ROOT="/opt/habanalabs/libfabric-${LIBFABRIC_VERSION}"
ENV MPI_ROOT=/opt/amazon/openmpi
ENV LD_LIBRARY_PATH=$LIBFABRIC_ROOT/lib:${MPI_ROOT}/lib:/usr/lib/habanalabs:$LD_LIBRARY_PATH
ENV PATH=${LIBFABRIC_ROOT}/bin:${MPI_ROOT}/bin:$PATH
ENV MPICC=${MPI_ROOT}/bin/mpicc
ENV OPAL_PREFIX=${MPI_ROOT}
ENV RDMAV_FORK_SAFE=1
ENV FI_EFA_USE_DEVICE_RDMA=1
ENV RDMA_CORE_ROOT=/opt/habanalabs/rdma-core/src
ENV RDMA_CORE_LIB=${RDMA_CORE_ROOT}/build/lib

# Gaudi stack doesn't (yet) support 3.11, thus
# downgrade python from 3.11.x to 3.10.14
RUN source /opt/conda/etc/profile.d/conda.sh \
 && conda activate base \
 && conda install -y -q --no-pin python=3.10.14 \
 && sed -i 's/python ==.*/python ==3.10.14/' /opt/conda/conda-meta/pinned \
 && conda clean -a -f -y

USER root

# install various support libraries
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
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
 && apt-get autoremove \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# install elastic fabric adapter
RUN apt-get update && export EFA_VERSION=1.29.0 && mkdir /tmp/efa \
 && wget -q -O- https://efa-installer.amazonaws.com/aws-efa-installer-$EFA_VERSION.tar.gz | tar xz -C /tmp/efa \
 && cd /tmp/efa/aws-efa-installer && ./efa_installer.sh -y --skip-kmod --skip-limit-conf --no-verify \
 && rm -rf /tmp/efa && rm -rf /etc/ld.so.conf.d/efa.conf /etc/profile.d/efa.sh \
 && apt-get autoremove && apt-get clean && rm -rf /var/lib/apt/lists/*

# install habana packages
RUN wget -O- https://${ARTIFACTORY_URL}/artifactory/api/gpg/key/public | gpg --dearmor -o /usr/share/keyrings/habana-artifactory.gpg \
 && chown root:root /usr/share/keyrings/habana-artifactory.gpg \
 && chmod 644 /usr/share/keyrings/habana-artifactory.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/habana-artifactory.gpg] https://${ARTIFACTORY_URL}/artifactory/debian jammy main" | tee -a /etc/apt/sources.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
    habanalabs-rdma-core="$VERSION"-"$REVISION" \
    habanalabs-thunk="$VERSION"-"$REVISION" \
    habanalabs-firmware-tools="$VERSION"-"$REVISION" \
    habanalabs-graph="$VERSION"-"$REVISION" \
 && apt-get autoremove --yes && apt-get clean && rm -rf /var/lib/apt/lists/* \
 && sed --in-place "/$ARTIFACTORY_URL/d" /etc/apt/sources.list

# install libfabric
RUN wget -nv -O /tmp/libfabric-${LIBFABRIC_VERSION}.tar.bz2 https://github.com/ofiwg/libfabric/releases/download/v${LIBFABRIC_VERSION}/libfabric-${LIBFABRIC_VERSION}.tar.bz2 \
 && cd /tmp/ && tar xf /tmp/libfabric-${LIBFABRIC_VERSION}.tar.bz2 \
 && cd /tmp/libfabric-${LIBFABRIC_VERSION} \
 && ./configure --prefix=$LIBFABRIC_ROOT --enable-psm3-verbs --enable-verbs=yes --with-synapseai=/usr \
 && make -j && make install && cd / && rm -rf /tmp/libfabric-${LIBFABRIC_VERSION}.tar.bz2 /tmp/libfabric-${LIBFABRIC_VERSION}

# install hccl wrapper for ofi
RUN wget -nv -O /tmp/main.zip https://github.com/HabanaAI/hccl_ofi_wrapper/archive/refs/heads/main.zip \
 && unzip /tmp/main.zip -d /tmp \
 && cd /tmp/hccl_ofi_wrapper-main \
 && make \
 && cp -f libhccl_ofi_wrapper.so /usr/lib/habanalabs/libhccl_ofi_wrapper.so \
 && cd / \
 && rm -rf /tmp/main.zip /tmp/hccl_ofi_wrapper-main

RUN /sbin/ldconfig

USER $NB_UID

# install habana pytorch and media python libraries
RUN python3 -m pip install habana_media_loader=="${VERSION}"."${REVISION}"

RUN mkdir /tmp/gaudipt \
 && wget -q https://vault.habana.ai/artifactory/gaudi-pt-modules/${VERSION}/${REVISION}/pytorch/ubuntu${OS_NUMBER}/pytorch_modules-v${PYTORCH_VERSION}_${VERSION}_${REVISION}.tgz -O - | tar xz -C /tmp/gaudipt \
 && cd /tmp/gaudipt && PYTHON_VERSION=3.10 bash install.sh ${VERSION} ${REVISION} \
 && rm -rf /tmp/gaudipt

ENV LD_PRELOAD=/lib/x86_64-linux-gnu/libtcmalloc.so.4

RUN echo "source /etc/profile.d/habanalabs.sh" >> ~/.bashrc

# install - requirements.txt
COPY --chown=${NB_USER}:users requirements.txt /tmp
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

ARG base_image=nvidia/cuda:8.0-cudnn6-devel-ubuntu16.04
FROM $base_image

ARG tf_version=1.6.0
ARG cuda_version=8.0
ARG cudnn_version=6
ARG bazel_version=0.5.4
ARG tf_cuda_compatibility=3.5,5.2,6.1
ARG cuda_config_version=8-0

MAINTAINER Jingtian Peng <pjt73651@gmail.com>

RUN     apt-get update && apt-get install -y software-properties-common && \
        # TODO (pmackinn) see if explicit libstdc++6 is still really required with next pin
        add-apt-repository ppa:ubuntu-toolchain-r/test -y && \
        apt-get update && apt-get install -y \
        build-essential \
        curl \
        libcurl3-dev \
        git \
        libfreetype6-dev \
        libpng12-dev \
        libzmq3-dev \
        pkg-config \
        python-dev \
        python-numpy \
        python-pip \
        swig \
        zip \
        zlib1g-dev \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up grpc
RUN pip install mock grpcio

# Set up all envs
ENV BAZELRC=/root/.bazelrc \
    TF_SERVING_VERSION=tags/$tf_version \
    TF_CUDA_VERSION=$cuda_version \
    TF_CUDNN_VERSION=$cudnn_version \
    BAZEL_VERSION=$bazel_version \
    TF_NEED_CUDA=1 \
    TF_NEED_S3=1 \
    TF_CUDA_COMPUTE_CAPABILITIES=$tf_cuda_compatibility \
    TF_NEED_GCP=1 \
    TF_NEED_JEMALLOC=0 \
    TF_NEED_HDFS=1 \
    TF_NEED_OPENCL=0 \
    TF_NEED_MKL=0 \
    TF_NEED_VERBS=0 \
    TF_NEED_MPI=0 \
    TF_NEED_GDR=0 \
    TF_ENABLE_XLA=1 \
    TF_CUDA_CLANG=0 \
    TF_NEED_OPENCL_SYCL=0 \
    CUDA_TOOLKIT_PATH=/usr/local/cuda \
    CUDNN_INSTALL_PATH=/usr/lib/x86_64-linux-gnu \
    GCC_HOST_COMPILER_PATH=/usr/bin/gcc \
    PYTHON_BIN_PATH=/usr/bin/python \
    CC_OPT_FLAGS="-march=native" \
    PYTHON_LIB_PATH=/usr/local/lib/python2.7/dist-packages

# Install the most recent bazel release.
RUN mkdir /bazel && \
    cd /bazel && \
    curl -fSsL -O https://github.com/bazelbuild/bazel/releases/download/$BAZEL_VERSION/bazel-$BAZEL_VERSION-installer-linux-x86_64.sh && \
    curl -fSsL -o /bazel/LICENSE.txt https://raw.githubusercontent.com/bazelbuild/bazel/master/LICENSE && \
    chmod +x bazel-*.sh && \
    ./bazel-$BAZEL_VERSION-installer-linux-x86_64.sh && \
    rm -f /bazel/bazel-$BAZEL_VERSION-installer-linux-x86_64.sh

# Clone TensorFlow Serving repo and get submodules
RUN cd /root && \
    git clone --recurse-submodules https://github.com/tensorflow/serving && \
    cd serving && \
    git checkout $TF_SERVING_VERSION && \
    git submodule init && \
    git submodule update --recursive

# Compile TF serving with CUDA support
RUN cd /root/serving && \
    bazel build -c opt --copt=-mavx --copt=-mavx2 --copt=-mfma --copt=-mfpmath=both --copt=-msse4.2 --config=cuda -k --verbose_failures --crosstool_top=@local_config_cuda//crosstool:toolchain tensorflow_serving/model_servers:tensorflow_model_server

# Make a copy to /usr/bin instead of making softlinks because /root has 700 permissions
RUN cp /root/serving/bazel-bin/tensorflow_serving/model_servers/tensorflow_model_server /usr/bin/tensorflow_model_server

# This seems to be some magic provided by nvidia-docker but we must be explicit
# There didn't seem to be any special flags in the TF Dockerfile.devel-gpu to cover this either
RUN ln -s /usr/local/cuda/lib64/stubs/libcuda.so /usr/local/cuda/lib64/stubs/libcuda.so.1 && \
    sed -i '$ a /usr/local/cuda/lib64/stubs' /etc/ld.so.conf.d/cuda-$cuda_config_version.conf && ldconfig

WORKDIR /root

CMD ["/bin/bash"]

ENV MS_USER=model-server

RUN set -x \
    && useradd $MS_USER \
    && [ `id -u $MS_USER` -eq 1000 ] \
    && [ `id -g $MS_USER` -eq 1000 ]

ENV TINI_VERSION v0.18.0

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini

RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]

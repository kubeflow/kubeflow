# Copyright 2017 Google Inc.
#
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

ARG base_image=ubuntu:16.04
FROM $base_image

ARG package=http://storage.googleapis.com/tensorflow-serving-apt/pool/tensorflow-model-server/t/tensorflow-model-server/tensorflow-model-server_1.6.0_all.deb

MAINTAINER Kenneth Owens <kowens@google.com>

ENV MS_USER=model-server

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
        libstdc++6 \
        libzmq3-dev \
        pkg-config \
        python-dev \
        python-numpy \
        python-pip \
        swig \
        zip \
        zlib1g-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -o tensorflow-model-server.deb $package
RUN dpkg -i tensorflow-model-server.deb

RUN set -x \
    && useradd $MS_USER \
    && [ `id -u $MS_USER` -eq 1000 ] \
    && [ `id -g $MS_USER` -eq 1000 ]

ENV TINI_VERSION v0.18.0

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini

RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]

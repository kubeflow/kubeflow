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

FROM ubuntu:latest

MAINTAINER Peng Yu <peng.yu@shopify.com>

ENV MS_USER=mxnet-model-server

RUN apt-get update && apt-get install -y \
        software-properties-common && \
	add-apt-repository -y ppa:certbot/certbot &&\
	apt-get update && \
	apt-get install -y \
	build-essential \
	libatlas-base-dev \
	libopencv-dev \
	graphviz \
	python-dev \
	openjdk-8-jdk \
	nginx \
	protobuf-compiler \
	libprotoc-dev \
	python-certbot-nginx \
	curl \
        python-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip install \
	    gevent \
	    gunicorn \
	    mxnet-model-server &&\
	    pip uninstall --yes \
	    mxnet && \
	    pip install mxnet-mkl

ADD mms_docker_cpu mms_docker_cpu

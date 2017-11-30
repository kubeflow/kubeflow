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

# Docker image for running examples in Tensorflow models.
# base_image depends on whether we are running on GPUs or non-GPUs
FROM tensorflow/tensorflow@sha256:bfadad8f2c80424d8d6059d3b8cd6947bf23111dc786fc33db72b56b632a1f28

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    git

RUN mkdir -p /opt

RUN git clone https://github.com/tensorflow/benchmarks.git /opt/tf-benchmarks

COPY launcher.py /opt
RUN chmod u+x /opt/*
ENTRYPOINT ["/opt/launcher.py"]

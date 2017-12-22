# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


### dependency ==================
FROM ubuntu:16.04
MAINTAINER Google Cloud ML

RUN mkdir -p /tools
COPY retry.sh /tools/retry.sh
RUN chmod a+x /tools/retry.sh

# Setup OS and core packages.
# Note that this cleans up the apt package lists at the end; add new packages to
# install here, instead of adding additional `apt-get install` commands later in
# this Dockerfile (or in Dockerfiles that inherit from this one).
COPY aptget-requirements.txt /aptget-requirements.txt
RUN echo "deb-src http://ftp.us.debian.org/debian testing main" >> /etc/apt/sources.list && \
    echo "deb http://http.debian.net/debian jessie-backports main" >> /etc/apt/sources.list && \
    # This can be somewhat unreliable, so we retry.
    /tools/retry.sh apt-get update -y && \
    # Install our list of apt-get requirements, stripping out comments.
    /tools/retry.sh apt-get install --no-install-recommends -y -q \
        $(grep -vE "^\s*#" aptget-requirements.txt | tr "\n" " ") \
        && \
    easy_install pip && \
    # Remove retrieved package files.
    apt-get clean && \
    # Remove apt package lists.
    # See http://unix.stackexchange.com/questions/217369/clear-apt-get-list
    rm -rf /var/lib/apt/lists/*

# Setup Python packages.
COPY pip-requirements.txt /pip-requirements.txt
RUN pip install -r pip-requirements.txt && \
    easy_install pip && \
    # Remove pip cache.
    rm -rf /root/.cache/pip && \
    find /usr/local/lib/python2.7 -type d -name tests | xargs rm -rf

# Install NLTK data for stopwords
# If nltk is not available, ignore the error
RUN python -m nltk.downloader -d /usr/local/share/nltk_data stopwords; exit 0

# google cloud sdk
RUN wget -nv https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.zip && \
    unzip -qq google-cloud-sdk.zip -d tools && \
    rm google-cloud-sdk.zip && \
    tools/google-cloud-sdk/install.sh --usage-reporting=false \
        --path-update=false --bash-completion=false \
        --disable-installation-options && \
    tools/google-cloud-sdk/bin/gcloud config set --installation \
        component_manager/fixed_sdk_version 138.0.0 && \
    tools/google-cloud-sdk/bin/gcloud -q components update \
        gcloud core bq gsutil compute preview alpha beta && \
    rm -rf /root/.config/* && \
    ln -s /root/.config /config && \
    touch /tools/google-cloud-sdk/lib/third_party/google.py && \
    # Remove the backup directory that gcloud creates
    rm -rf /tools/google-cloud-sdk/.install/.backup

# Path configuration
ENV PATH $PATH:/tools/google-cloud-sdk/bin

# Make sure gsutil will use the default service account
RUN echo '[GoogleCompute]\nservice_account = default' > /etc/boto.cfg

RUN echo '169.254.169.254 metadata.google.internal' >> /etc/hosts

# Set the python 2 as the default version.
RUN cp /usr/bin/python /usr/bin/python-default

### tf serving =============
COPY version-config.json /tools/version-config.json
COPY install_tensorflow_serving.sh /tools/install_tensorflow_serving.sh
RUN chmod a+x /tools/install_tensorflow_serving.sh

# Copy support files to container
# We are copying all files because Docker is unhappy if the copy command
# can't find files, and we sometimes don't bother building the TensorFlow
# Serving binaries. But when we do, we need them.
RUN mkdir -p /tmp/from_host
COPY * /tmp/from_host/

RUN /tools/install_tensorflow_serving.sh

### prediction ==============

COPY version-config.json /tmp/version-config.json

# Install Online Prediction's required pip packages.
RUN pip install WebOb==1.7.2 Paste==2.0.3 tornado==4.5.1 grpcio==1.3.0 \
    requests==2.13.0 webapp2==3.0.0b1 gcloud==0.18.3 SciPy==0.19.1 \
    scikit-learn==0.19.0 numpy==1.13.1

# Install the xgboost version specified in version-config.json
RUN xgboost_version=$(cat /tmp/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['xgboost_version']") && \
  echo "xgboost_version: ${xgboost_version}" && \
  if [ "${xgboost_version}" = "head" ]; then \
    xgboost_commit=$(cat /tmp/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['xgboost_commit']") && \
    echo "Installing xgboost from github with commit id: ${xgboost_commit}" && \
    mkdir -p "/tmp/xgboost" && \
    cd "/tmp/xgboost" && \
    git clone --recursive https://github.com/dmlc/xgboost && \
    cd xgboost && \
    git reset --hard ${xgboost_commit} && \
    make -j4 && \
    cd python-package && \
    python setup.py install && \
    cd ../../ && \
    export PYTHONPATH=$PYTHONPATH:./xgboost/python-package; \
  else \
      echo "Installing xgboost version ${xgboost_version}" && \
      pip install xgboost==${xgboost_version}; \
  fi


# See https://www.tensorflow.org/versions/r0.11/get_started/os_setup.html#protobuf-library-related-issues
RUN pip install --upgrade protobuf==3.2.0 && \
    # Check that the fast implementation of protobuf is used.
    python -c "from google.protobuf.internal import api_implementation; assert api_implementation._default_implementation_type == 'cpp'; print 'Verified fast protobuf used.'" && \
    # Remove pip cache.
    rm -rf /root/.cache/pip

# Unpack prediction server.
COPY server/prediction_server.py server/prediction_server.py
COPY server/prediction_server_lib.py server/prediction_server_lib.py
COPY server/frameworks/tf_prediction_server_lib.py server/frameworks/tf_prediction_server_lib.py
COPY server/prediction/prediction_lib.py server/prediction/prediction_lib.py
COPY server/prediction/_interfaces.py server/prediction/_interfaces.py
COPY server/util/_retry.py server/util/_retry.py
COPY server/util/_exceptions.py server/util/_exceptions.py

# Setup for running gsutil. Point both config directories to tmp because all
# other directories are not writeable by the client app.
ENV CLOUDSDK_CONFIG /tmp
# GSUtil state_dir parameter points to temporary scratch space gsutil can use.
# It has to be in /tmp to be writeable in gvisor/titanium. Boto is documented here
# https://cloud.google.com/storage/docs/boto-gsutil
RUN echo '[GSUtil]\nstate_dir = /tmp' >> /etc/boto.cfg

# Only expose the prediction server port.
EXPOSE 8080

RUN export CLOUDML_RUNTIME_VERSION=$(python -c 'import yaml;print yaml.load(open("/tmp/version-config.json", "r"))["cloudml_runtime_version"]') && \
    echo "Cloud ML Runtime version ${CLOUDML_RUNTIME_VERSION}"
# Allow the prediction server to access the TensorFlow, Scikit-learn, and
# Xgboost libraries in the frameworks/ directory.
RUN touch server/__init__.py
RUN touch server/frameworks/__init__.py
RUN touch server/util/__init__.py
RUN touch server/prediction/__init__.py

RUN rm /tmp/version-config.json
# Startup.
ENTRYPOINT ["python", "server/prediction_server.py", "--model_server_binary_path", "/bin/tensorflow_model_server"]

#!/bin/bash
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

# Extract version information from version-config.json file
tf_serving_tf_version=$(cat /tools/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['tf_serving_tf_version']")
tf_serving_ms_version=$(cat /tools/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['tf_serving_ms_version']")
tf_serving_ms_name=$(cat /tools/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['tf_serving_ms_name']")
tf_serving_api_version=$(cat /tools/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['tf_serving_api_version']")
host_dir=/tmp/from_host

# Quit early if any command fails.
# Should occur AFTER we check version-config.json variables.
set -ex

echo "Logging the support files copied from the host into the container"
ls ${host_dir}

# Install TensorFlow.
# Needed for the online prediction server, i.e. prediction_server_beta.py and
# its dependencies.
echo "Installing TensorFlow"
if [ -z "${tf_serving_tf_version}" ]; then
  echo "Installing from locally built files."
  mkdir -p /opt/google/cloud/ml/packages
  cp ${host_dir}/tensorflow-0.head-cp27-none-linux_x86_64.whl \
    /opt/google/cloud/ml/packages/tensorflow-0.head-cp27-none-linux_x86_64.whl
  pip install /opt/google/cloud/ml/packages/tensorflow-0.head-cp27-none-linux_x86_64.whl && \
    md5sum /opt/google/cloud/ml/packages/tensorflow-0.head-cp27-none-linux_x86_64.whl > /var/tensorflow.md5hash && \
    rm -rf /root/.cache/pip  # Remove pip cache.
  cp ${host_dir}/tensorflow_build /tensorflow_build
else
  echo "Installing version ${tf_serving_tf_version}"
  pip install tensorflow==${tf_serving_tf_version}
fi

# Install the tensorflow_serving Python package.
# Needed for the online prediction server, i.e. prediction_server_beta.py and
# its dependencies.
echo "Installing TensorFlow Serving's API libraries"
if [ -z "${tf_serving_api_version}" ]; then
  echo "Installing from locally built files."
  cp ${host_dir}/tensorflow_serving.tar.gz /tmp/tensorflow_serving.tar.gz
  tar -C /usr/lib/python2.7 -xzf /tmp/tensorflow_serving.tar.gz && \
    rm /tmp/tensorflow_serving.tar.gz
else
  echo "Installing version ${tf_serving_api_version}"
  pip install tensorflow-serving-api==${tf_serving_api_version}
fi

# Install TensorFlow Serving's model server.
# This is run by prediction_server_beta.py.
echo "Installing TensorFlow Serving's model server"
if [ -z "${tf_serving_ms_version}" ]; then
  echo "Installing from locally built files."
  # b/67381108 tracks where we want tensorflow_model_server to be placed.
  cp ${host_dir}/tensorflow_model_server /bin/tensorflow_model_server
  chmod a+x /bin/tensorflow_model_server
  cp ${host_dir}/tensorflow_serving_build /tensorflow_serving_build
else
  echo "Installing component ${tf_serving_ms_name}, version ${tf_serving_ms_version}"
  echo "deb [arch=amd64] http://storage.googleapis.com/tensorflow-serving-apt testing ${tf_serving_ms_name}-${tf_serving_ms_version}" \
    | tee /etc/apt/sources.list.d/tensorflow-serving.list
  curl https://storage.googleapis.com/tensorflow-serving-apt/tensorflow-serving.release.pub.gpg | apt-key add -
  apt-get update && apt-get install ${tf_serving_ms_name}

  # b/67381108 tracks where we want tensorflow_model_server to be placed.
  mv /usr/bin/tensorflow_model_server /bin
fi

# Unpack prereleased gsutil
# TODO(pdudnik): remove when gvisor's fix propagates to titanium prod and
# normal gsutil is verified to work
echo "Installing prereleased gsutil"
if [ -e ${host_dir}/gsutil_4.23pre_oauth2cache2.tar.gz ]; then
  mkdir /prereleased_gsutil

  cp ${host_dir}/gsutil_4.23pre_oauth2cache2.tar.gz /prereleased_gsutil/
  pushd .
  cd /prereleased_gsutil
  tar -xvzf gsutil_4.23pre_oauth2cache2.tar.gz
  popd
  chmod +x /prereleased_gsutil/gsutil/gsutil.py
else
  echo "Prereleased version of gsutil not found."
  exit 1
fi

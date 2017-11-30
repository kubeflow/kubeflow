#!/usr/bin/env bash

# Copyright 2016 The Kubeflow Authors All rights reserved.
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

# stored in the NB Dockerfile
SRC_CONF=/tmp/jupyter_notebook_config.py
WORK_DIR=$HOME/work
CONF_DIR=$HOME/.jupyter

echo "checking if $HOME volume needs init..."

if [ "$(ls --ignore=lost+found -A $HOME)" ]; then
  # assume we are working with an existing volume via a PVC
  echo "...$HOME already has content..."
else
  # clean volume, needs init
  echo "...creating $WORK_DIR"
  mkdir $WORK_DIR
  mkdir $CONF_DIR

  echo "...load initial content into $HOME..."
  cp $SRC_CONF $CONF_DIR

  chown -R $NB_USER:users $(ls -A $HOME)
fi

echo "...done"

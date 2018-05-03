#!/bin/bash

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
SRC_TAR=/tmp/$NB_USER.tar
WORK_DIR=$HOME/work

echo "checking if $HOME volume needs init..."

if [ "$(ls -A $HOME)" ]; then
    # assume we are working with an existing volume via a PVC
    echo "...$HOME already has content. Reinstalling packages..."
    cd $HOME
    pip install -q -r $HOME/requirements.txt
    source activate py2 && pip install -q -r $HOME/requirements.txt
else
    # clean volume, needs init
    echo "...creating $WORK_DIR"
    mkdir $WORK_DIR

    echo "...load initial content into $HOME..."
    tar --no-overwrite-dir -xf $SRC_TAR -C $HOME .

    chown -R $NB_USER:users $(ls -A $HOME)
fi

echo "...done"

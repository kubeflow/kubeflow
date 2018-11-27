#!/usr/bin/env bash
# Copyright 2017 The Kubeflow Authors All rights reserved.
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

set -e

# Handle special flags if we're root
if [ $(id -u) == 0 ]; then
  # Handle username change. Since this is cheap, do this unconditionally
  usermod -d /home/$NB_USER -l $NB_USER jovyan

  # Change UID of NB_USER to NB_UID if it does not match
  if [ "$NB_UID" != $(id -u $NB_USER) ]; then
    echo "Set user UID to: $NB_UID"
    usermod -u $NB_UID $NB_USER
    for d in "$CONDA_DIR" "$JULIA_PKGDIR"; do
      if [[ ! -z "$d" && -d "$d" ]]; then
        echo "Set ownership to uid $NB_UID: $d"
        chown -R $NB_UID "$d"
      fi
    done
  fi

  # Change GID of NB_USER to NB_GID if NB_GID is passed as a parameter
  if [ "$NB_GID" ]; then
    echo "Change GID to $NB_GID"
    groupmod -g $NB_GID -o $(id -g -n $NB_USER)
  fi

  # Enable sudo if requested
  if [[ "$GRANT_SUDO" == "1" || "$GRANT_SUDO" == 'yes' ]]; then
    echo "Granting $NB_USER sudo access"
    echo "$NB_USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/notebook
  fi

  # Exec the command as NB_USER
  echo "Execute the command as $NB_USER"
  exec su $NB_USER -c "env PATH=$PATH $*"
else
  if [[ ! -z "$NB_UID" && "$NB_UID" != "$(id -u)" ]]; then
    echo 'Container must be run as root to set $NB_UID'
  fi
  if [[ ! -z "$NB_GID" && "$NB_GID" != "$(id -g)" ]]; then
    echo 'Container must be run as root to set $NB_GID'
  fi
  if [[ "$GRANT_SUDO" == "1" || "$GRANT_SUDO" == 'yes' ]]; then
    echo 'Container must be run as root to grant sudo permissions'
  fi
  # Exec the command
  echo "Execute the command"
  exec $*
fi

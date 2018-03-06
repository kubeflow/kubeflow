#!/bin/bash

# Copyright 2018 The Kubeflow Authors All rights reserved.
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

# Get token to access an IAP enabled cluster.

# Usage:
# get_token.sh auth your_auth_code, or
# get_token.sh refresh your_refresh_code

set -e

if [ -z ${OTHER_CLIENT_ID} ]; then
  echo Error OTHER_CLIENT_ID must be set
  exit 1
fi

if [ -z ${OTHER_CLIENT_SECRET} ]; then
  echo Error OTHER_CLIENT_SECRET must be set
  exit 1
fi

if [ -z ${IAP_CLIENT_ID} ]; then
  echo Error IAP_CLIENT_ID must be set
  exit 1
fi

auth_type=$1
code=$2

if [ $auth_type == "auth" ]; then
  REFRESH_TOKEN="$(curl \
      --data client_id=${OTHER_CLIENT_ID} \
      --data client_secret=${OTHER_CLIENT_SECRET} \
      --data code=$code \
      --data redirect_uri=urn:ietf:wg:oauth:2.0:oob \
      --data grant_type=authorization_code \
      https://www.googleapis.com/oauth2/v4/token \
      | python -c "import json,sys;obj=json.load(sys.stdin);print obj['refresh_token'];")"
  echo REFRESH_TOKEN=$REFRESH_TOKEN
elif [ $auth_type == "refresh" ]; then
  export REFRESH_TOKEN=$code
else
  echo "Usage: get_token.sh auth your_auth_code, get_token.sh refresh your_refresh_code"
fi

export ID_TOKEN="$(curl \
    --data client_id=${OTHER_CLIENT_ID} \
    --data client_secret=${OTHER_CLIENT_SECRET} \
    --data refresh_token=${REFRESH_TOKEN} \
    --data grant_type=refresh_token \
    --data audience=${IAP_CLIENT_ID} \
    https://www.googleapis.com/oauth2/v4/token \
    | python -c "import json,sys;obj=json.load(sys.stdin);print obj['id_token'];")"
echo ID_TOKEN=$ID_TOKEN

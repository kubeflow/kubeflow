# -*- coding: utf-8 -*-
#
# Copyright 2015 Google Inc. All Rights Reserved.
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

# [START app]

# import modules

import json
import subprocess
import yaml

# declaring some variables
images = []
timeout = '7200s'
filename = 'cloudbuild.yaml'
builder = 'gcr.io/cloud-builders/docker'
kfRepo = 'gcr.io/kubeflow-images-public/'
myRepo = 'gcr.io/<my_repo>'

# Get Auth
with open('keys.yaml', 'r') as keyfile:
  kcfg = yaml.load(keyfile)

login = kcfg['username']
pswd = kcfg['password']

# build a json file with all files.
repos = subprocess.run([
    "gcloud", "--project=kubeflow-images-public", "container", "images", "list",
    "--format=json"
],
                       stdout=subprocess.PIPE,
                       stderr=subprocess.STDOUT)
my_json = json.loads(repos.stdout.decode('utf8').strip().replace("'", '"'))
for data in my_json:
  for name, image in data.items():
    # get Tags and Repos
    raw_images = subprocess.run([
        "gcloud", "container", "images", "list", "--repository=" + image + "",
        "--format=json"
    ],
                                stdout=subprocess.PIPE,
                                stderr=subprocess.STDOUT)
    imgData = raw_images.stdout.decode("utf-8")
    if "[]" not in imgData:
      imgJson = json.loads(
          raw_images.stdout.decode("utf-8").strip().replace("'", '"'))
      for stuff in imgJson:
        for a, b in stuff.items():
          images.append(b)
      images.append(image)

for item in images:
  getTags = subprocess.run([
      "gcloud", "--project=kubeflow-images-public", "container", "images",
      "list-tags", item, "--format=json", "--limit=1"
  ],
                           stdout=subprocess.PIPE,
                           stderr=subprocess.STDOUT)
  preTags = json.loads(getTags.stdout.decode('utf8').replace("'", '"'))
  for datum in preTags:
    t = datum['digest']
    s = item[30:]
    myTag = item + "@" + t
    theyaml = {
        'timeout':
        timeout,
        'steps': [
            {
                'name': builder,
                'args': ['login', '-u', login, '-p', pswd],
                'timeout': timeout,
            },
            {
                'name': builder,
                'args': ['pull', myTag],
                'timeout': timeout,
            },
            {
                'name': builder,
                'args': ['tag', myTag, myRepo + s],
                'timeout': timeout,
            },
            {
                'name': builder,
                'args': ['push', myRepo + s],
                'timeout': timeout,
            },
        ]
    }
    with open(filename, 'a') as outfile:
      yaml.dump(theyaml, outfile, default_flow_style=False)

    subprocess.run(["gcloud", "builds", "submit", "--config", filename],
                   stdout=subprocess.PIPE,
                   stderr=subprocess.STDOUT)

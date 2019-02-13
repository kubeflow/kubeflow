#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
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
"""A simple utility to convert a manifest to corresponding jsonnet."""
import argparse
import json
import yaml

if __name__ == "__main__":
  parser = argparse.ArgumentParser(description="Convert manifest.")
  parser.add_argument(
      "--manifest",
      type=str,
      required=True,
  )

  args = parser.parse_args()

  with open(args.manifest) as hf:
    manifest = hf.read()

  components = manifest.split("---")

  index = 0
  for c in components:
    t = c.strip()
    if not t:
      continue

    d = yaml.load(t)
    j = json.dumps(d, indent=2, sort_keys=True)
    print("component_{0}:: {1}, \n".format(index, j))
    index += 1

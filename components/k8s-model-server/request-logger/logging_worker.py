#!/usr/bin/env python

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
"""Worker for request logging.
It should be deploy as a sidecar with the serving component.
"""
from __future__ import print_function

import argparse
import ast
import json
import os
import time

from google.cloud import bigquery

BQ_URL = 'https://www.googleapis.com/bigquery/v2/projects/{}/datasets/{}/tables/{}/insertAll'

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--file-path', default='/tmp/logs/request_logs', help='The path to log files.')
  parser.add_argument('project', help='The GCP project')
  parser.add_argument('dataset', help='The Bigquery dataset')
  parser.add_argument('table', help='The Bigquery table')
  args = parser.parse_args()

  client = bigquery.Client()
  dataset_ref = client.dataset(args.dataset, project=args.project)
  table_ref = dataset_ref.table(args.table)
  table = client.get_table(table_ref)

  # rotating files.
  target_file = args.file_path + '.1'
  while True:
    time.sleep(10)
    if not os.path.isfile(target_file):
      continue
    print('found the file\n')
    with open(target_file) as f:
      content = f.readlines()
    os.remove(target_file)
    # Use literal_eval to make str -> dict.
    rows = map(ast.literal_eval, content)

    errors = client.insert_rows(table, rows)
    if errors != []:
      print('Error: {}'.format(errors))

if __name__ == '__main__':
  main()

#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
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
"""
A launcher suitable for invoking tf_cnn_benchmarks using TfJob.

All the launcher does is turn TF_CONFIG environment variable into extra
arguments to append to the command line.
"""
import json
import logging
import os
import subprocess
import sys
import time


def run_and_stream(cmd):
  logging.info("Running %s", " ".join(cmd))
  process = subprocess.Popen(
      cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

  while process.poll() is None:
    process.stdout.flush()
    if process.stderr:
      process.stderr.flush()
    sys.stderr.flush()
    sys.stdout.flush()
    for line in iter(process.stdout.readline, b''):
      process.stdout.flush()
      logging.info(line.strip())

  sys.stderr.flush()
  sys.stdout.flush()
  process.stdout.flush()
  if process.stderr:
    process.stderr.flush()
  for line in iter(process.stdout.readline, b''):
    logging.info(line.strip())

  if process.returncode != 0:
    raise ValueError("cmd: {0} exited with code {1}".format(
        " ".join(cmd), process.returncode))


if __name__ == "__main__":
  logging.getLogger().setLevel(logging.INFO)
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.info("Launcher started.")
  tf_config = os.environ.get('TF_CONFIG', '{}')
  tf_config_json = json.loads(tf_config)
  cluster = tf_config_json.get('cluster', {})
  job_name = tf_config_json.get('task', {}).get('type', "")
  task_index = tf_config_json.get('task', {}).get('index', "")

  command = sys.argv[1:]
  ps_hosts = ",".join(cluster.get("ps", []))
  worker_hosts = ",".join(cluster.get("worker", []))
  command.append("--job_name=" + job_name)
  command.append("--ps_hosts=" + ps_hosts)
  command.append("--worker_hosts=" + worker_hosts)
  command.append("--task_index={0}".format(task_index))

  logging.info("Command to run: %s", " ".join(command))
  with open("/opt/run_benchmarks.sh", "w") as hf:
    hf.write("#!/bin/bash\n")
    hf.write(" ".join(command))
    hf.write("\n")

  run_and_stream(command)
  logging.info("Finished: %s", " ".join(command))
  # We don't want to terminate because TfJob will just restart the job.
  while True:
    logging.info("Command ran successfully sleep for ever.")
    time.sleep(600)

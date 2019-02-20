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
"""A simple script to generate TfJob templates based on various parameters."""

import argparse
import datetime
import logging
import yaml

TF_JOB_GROUP = "tensorflow.org"
TF_JOB_VERSION = "v1alpha1"
TF_JOB_PLURAL = "tfjobs"
TF_JOB_KIND = "TfJob"


# See
# https://stackoverflow.com/questions/21016220/is-it-possible-to-emit-valid-yaml-with-anchors-references-disabled-using-ruby  # noqa: E501
class ExplicitDumper(yaml.SafeDumper):
  """A dumper that will never emit aliases."""

  def ignore_aliases(self, data):
    return True


if __name__ == "__main__":
  logging.getLogger().setLevel(logging.INFO)  # pylint: disable=too-many-locals
  parser = argparse.ArgumentParser(description="Create TfJob specs.")

  parser.add_argument(
      "--cpu_image",
      type=str,
      required=True,
      help="The docker image for CPU jobs.")

  parser.add_argument(
      "--gpu_image",
      type=str,
      required=True,
      help="The docker image for GPU jobs.")

  parser.add_argument(
      "--num_workers",
      type=int,
      default=1,
      help="The number of workers to use.")

  parser.add_argument(
      "--output",
      type=str,
      help="(Optional) the file to write the template to.")

  parser.add_argument(
      "--gpu", dest="use_gpu", action="store_true", help="Use gpus.")
  parser.add_argument(
      "--no-gpu", dest="use_gpu", action="store_false", help="Do not use gpus.")

  parser.set_defaults(use_gpu=True)

  args = parser.parse_args()

  namespace = "default"
  job_name = "inception-" + datetime.datetime.now().strftime("%y%m%d-%H%M%S")
  if args.use_gpu:
    job_name += "-gpu"
  else:
    job_name += "-cpu"

  job_name += "-{0}".format(args.num_workers)

  body = {}
  body['apiVersion'] = TF_JOB_GROUP + "/" + TF_JOB_VERSION
  body['kind'] = TF_JOB_KIND
  body['metadata'] = {}
  body['metadata']['name'] = job_name
  body['metadata']['namespace'] = namespace

  clone_on_cpu = not args.use_gpu

  body["spec"] = {}
  body["spec"]["replicaSpecs"] = []

  working_dir = "/opt/tf-benchmarks/scripts/tf_cnn_benchmarks"

  num_workers = args.num_workers
  num_ps = 1

  command = [
      "python",
      "tf_cnn_benchmarks.py",
      "--batch_size=32",
      "--model=resnet50",
      "--variable_update=parameter_server",
      # tf_cnn_benchmarks uses print for logging and if we don't set
      # flush_stdout the buffer isn't outputted until the program ends..
      "--flush_stdout=true",
  ]

  if args.use_gpu:
    command.append("--num_gpus=1")
  else:
    # We need to set num_gpus=1 even if not using GPUs because otherwise
    # the devie list is empty because of this code
    # https://github.com/tensorflow/benchmarks/blob/master/scripts/tf_cnn_benchmarks/benchmark_cnn.py#L775  # noqa: E501
    command.append("--num_gpus=1")
    command.append("--local_parameter_device=cpu")
    command.append("--device=cpu")
    command.append("--data_format=NHWC")

  # Add the master spec. The master only acts as the chief and doesn't do
  # any training so it can always use the CPU image.
  master_spec = {
      "replicas": 1,
      "tfReplicaType": "MASTER",
      "template": {
          "spec": {
              "containers": [{
                  "image": args.cpu_image,
                  "name": "tensorflow",
                  "workingDir": working_dir,
                  "args": command,
              }],
              "restartPolicy":
              "OnFailure",
          }
      }
  }

  body["spec"]["replicaSpecs"].append(master_spec)

  worker_image = args.cpu_image
  if args.use_gpu:
    worker_image = args.gpu_image

  worker_spec = {
      "replicas": num_workers,
      "tfReplicaType": "WORKER",
      "template": {
          "spec": {
              "containers": [{
                  "image": worker_image,
                  "name": "tensorflow",
                  "workingDir": working_dir,
                  "args": command,
              }],
              "restartPolicy":
              "OnFailure",
          }
      }
  }

  if args.use_gpu:
    worker_spec["template"]["spec"]["containers"][0]["resources"] = {
        "limits": {
            "nvidia.com/gpu": 1,
        }
    }

  body["spec"]["replicaSpecs"].append(worker_spec)

  ps_spec = {
      "replicas": num_ps,
      "tfReplicaType": "PS",
      "template": {
          "spec": {
              "containers": [{
                  "image": args.cpu_image,
                  "name": "tensorflow",
                  "workingDir": working_dir,
                  "args": command,
              }],
              "restartPolicy":
              "OnFailure",
          }
      }
  }

  body["spec"]["replicaSpecs"].append(ps_spec)

  body["spec"]["tfImage"] = args.cpu_image

  # Tensorboard is crashing with TF 1.5
  # body["spec"]["tensorBoard"] = {
  #   "logDir": job_dir
  # }

  spec = yaml.dump(body, Dumper=ExplicitDumper, default_flow_style=False)

  if args.output:
    logging.info("Writing to %s", args.output)
    with open(args.output, "w") as hf:
      hf.write(spec)
  else:
    print(spec)

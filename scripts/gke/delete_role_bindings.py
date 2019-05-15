#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# A simple script to delete all role bindings for the service accounts created
# as part of a Kubeflow deployment. This is an effort to deal with:
# https://github.com/kubeflow/kubeflow/issues/953
import argparse
import logging
import json
import subprocess

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--project", default=None, type=str, help=("The project."))
  parser.add_argument(
      "--service_account", type=str, help=("The service account."))

  args = parser.parse_args()
  output = subprocess.check_output([
      "gcloud",
      "projects",
      "get-iam-policy",
      "--format=json",
      args.project,
  ])

  bindings = json.loads(output)
  roles = []
  entry = "serviceAccount:" + args.service_account
  for b in bindings["bindings"]:
    if entry in b["members"]:
      roles.append(b["role"])
  # TODO(jlewi): Can we issue a single gcloud command.
  for r in roles:
    command = [
        "gcloud",
        "projects",
        "remove-iam-policy-binding",
        args.project,
        "--member",
        entry,
        "--role",
        r,
    ]
    print(" ".join(command))
    subprocess.call(command)

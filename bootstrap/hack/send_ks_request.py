#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
A script for manual testing and experimenting with the ks server.

TODO(jlewi): Should we use this as the basis for doing E2E integration testing?
We can run the server in a subprocess. Send requests to it and then run various
checks on the results.
"""
import argparse
import datetime
import logging
import requests


def main():
  parser = argparse.ArgumentParser(
      description="Script to test sending requests to the ksonnet server.")

  parser.add_argument(
      "--endpoint",
      default="http://localhost:8080",
      type=str,
      help="The endpoint of the server")

  args = parser.parse_args()

  create_endpoint = args.endpoint + "/apps/create"

  now = datetime.datetime.now()

  data = {
      "Name": "test-app-" + now.strftime("%Y%m%d-%H%M%S"),
      "AppConfig": {
          "Registries": [
              {
                  "Name": "kubeflow",
                  "RegUri": "/home/jlewi/git_kubeflow/kubeflow",
              },
          ],
          "Packages": [{
              "Name": "core",
              "Registry": "kubeflow",
          }],
      },
      "Namespace": "kubeflow",
      "AutoConfigure": False,
  }
  r = requests.post(create_endpoint, json=data)
  if r.status_code != requests.codes.OK:
    logging.error("Request failed: status_code: %s", r.status_code)

  logging.info("Result Body: %s", r.content)


if __name__ == "__main__":
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  main()

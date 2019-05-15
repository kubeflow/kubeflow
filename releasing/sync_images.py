#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""This script synchronizes Docker image in image_tags.yaml to your own registry

Example:
python sync_images.py --registry registry.aliyuncs.com

This would sync up the docker images for kubeflow releasing to your own docker
registry.
"""

import sys
import os
import getopt
import time
import dateutil.parser
import re
import yaml
import logging
import argparse
import subprocess


def normalize_repo(repo):
  repo_names = repo.split('/', 3)
  if len(repo_names) == 1:
    repo_names = ['docker.io', 'library', repo_names[0]]
  if len(repo_names) == 2:
    repo_names = ['docker.io', repo_names[0], repo_names[1]]
  if len(repo_names) == 4:
    # gcr.io/kubeflow-images-public/katib/tfevent-metrics-collector:v0.4.0
    # -> gcr.io/katib/tfevent-metrics-collector:v0.4.0
    repo_names = [repo_names[0], repo_names[2], repo_names[3]]
  return repo_names


def main(unparsed_args=None):  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO)  # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(
      description="sync up the kubeflow docker images to your own registry")

  parser.add_argument(
      "--images_file",
      default="image_tags.yaml",
      type=str,
      help="Yaml file containing the tags to sync up.")

  parser.add_argument(
      "--registry",
      default="registry.aliyuncs.com",
      type=str,
      help=("docker registry e.g. registry.aliyuncs.com"))

  args = parser.parse_args()

  with open(args.images_file) as hf:
    config = yaml.load(hf)

  if not config:
    raise ValueError("No images could be load from %s" % args.images_file)

  # Loop over all the images and sync to your registry

  for image in config["images"]:
    name = image["name"]
    for v in image["versions"]:
      for tag in v["tags"]:
        repo_names = normalize_repo(name)
        source = name + ":" + tag
        registry = args.registry
        namespace = repo_names[1]
        newName = repo_names[2]
        new_repo_name = registry + '/' + namespace + '/' + newName
        dest = new_repo_name + ":" + tag
        logging.info("Sync up the image %s to %s", source, dest)
        logging.info("Pulling %s", source)
        rc = subprocess.call(["docker", "pull", source])
        if rc != 0:
          logging.info("Failed to Pull %s", source)
          continue
        logging.info("Tagging the image %s to %s", source, dest)
        rc = subprocess.call(["docker", "tag", source, dest])
        if rc != 0:
          logging.info("Failed to tag the image %s to %s", source, dest)
          continue
        logging.info("Push %s", dest)
        rc = subprocess.call(["docker", "push", dest])
        if rc != 0:
          logging.info("Failed to push the image %s", dest)
          continue
  logging.info("Done.")


if __name__ == "__main__":
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  main()

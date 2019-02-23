# -*- coding: utf-8 -*-
"""Apply the image tags as defined in image_tags.yaml"""

import argparse
import logging
import os
import re
import yaml

from kubeflow.testing import util


def main(unparsed_args=None):  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO)  # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(description="Apply tags to file")

  parser.add_argument(
      "--images_file",
      default="image_tags.yaml",
      type=str,
      help="Yaml file containing the tags to attach.")

  parser.add_argument(
      "--pattern",
      default="",
      type=str,
      help=("Regex pattern e.g. .*tensorflow.*notebook.*:v20180619.* "
            "to select the images to apply."))
  args = parser.parse_args()

  if not os.path.exists(args.images_file):
    raise ValueError("Missing image tags file: {0}".format(args.images_file))

  with open(args.images_file) as hf:
    config = yaml.load(hf)

  name_pattern, tag_pattern = args.pattern.split(":")
  name_re = re.compile(name_pattern)
  tag_re = re.compile(tag_pattern)

  for image in config["images"]:
    name = image["name"]
    if not name_re.match(name):
      continue
    for v in image["versions"]:
      for tag in v["tags"]:
        if not tag_re.match(tag):
          continue
        source = name + "@" + v["digest"]
        dest = name + ":" + tag
        util.run([
            "gcloud", "container", "images", "add-tag", "--quiet", source, dest
        ])

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

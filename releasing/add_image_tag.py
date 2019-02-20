# -*- coding: utf-8 -*-
"""This script adds or moves a tag in image_tags.yaml

This script doesn't actually update the images. For that you need to call
apply_image_tags using image_tags.yaml

The script looks for images matching a regex and will add a tag to that image.
If that tag is already on an existing version of the image it is removed.

Example:
python add_image_tag.py --pattern=.*tensorflow.*1.*notebook.*:v20180619.* \
  --tag=v0.2.0

This would add the tag v0.2.0 to images matching the pattern and remove it from
any existing images.
"""

import argparse
import logging
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

  parser.add_argument("--tag", default="", type=str, help="The tag to apply")

  args = parser.parse_args()

  with open(args.images_file) as hf:
    config = yaml.load(hf)

  if not config:
    raise ValueError("No images could be load from %s" % args.images_file)
  name_pattern, tag_pattern = args.pattern.split(":")
  name_re = re.compile(name_pattern)
  tag_re = re.compile(tag_pattern)

  for image in config["images"]:
    name = image["name"]
    if not name_re.match(name):
      continue

    # Loop over all the images and see if the supplied tag is already
    # mapped to an image and which version to add the label to.
    # The index of the version to add the tag to.
    new_index = []
    existing_index = []
    for v_index, v in enumerate(image["versions"]):
      for tag in v["tags"]:
        if tag == args.tag:
          existing_index.append(v_index)

        if tag_re.match(tag):
          new_index.append(v_index)

    if len(existing_index) > 1:
      logging.error("Multiple images %s had tag %s", name, args.tag)

    # TODO(jlewi)
    if existing_index and not new_index:
      logging.error("Not moving tag for image %s because no images matched %s",
                    name, args.pattern)
      existing_index = []
    for e in existing_index:
      image["versions"][e]["tags"].remove(args.tag)

      logging.info("Image %s removing tag from sha %s", name,
                   image["versions"][e]["digest"])

    if len(new_index) > 1:
      raise ValueError("Image {0} had {1} images match {2}".format(
          name, len(new_index, args.pattern)))

    if new_index:
      v = image["versions"][new_index[0]]
      logging.info("Image %s adding tag from sha %s", name, v["digest"])
      v["tags"].append(args.tag)

  with open(args.images_file, "w") as hf:
    hf.write(yaml.safe_dump(config, default_flow_style=False))
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

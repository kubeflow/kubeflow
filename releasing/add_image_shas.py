# -*- coding: utf-8 -*-
"""The script uses a regex to identify images in GCR and add entries for them to
image_tags.yaml
"""

import argparse
import logging
import re
import json
import yaml

from kubeflow.testing import util


def main(unparsed_args=None):  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO)  # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(description="Get Images by regex")

  parser.add_argument(
      "--pattern",
      default="",
      type=str,
      help="Regex pattern e.g. .*tensorflow.*notebook.*:v20180619.*")

  parser.add_argument(
      "--images_file",
      default="image_tags.yaml",
      type=str,
      help="Yaml file containing the tags to attach.")

  parser.add_argument(
      "--repository",
      default=None,
      type=str,
      help="GCR repository name (optional).")

  args = parser.parse_args()

  with open(args.images_file) as hf:
    config = yaml.load(hf)

  existing_images = {}

  for image in config["images"]:
    existing_images[image["name"]] = {}
    for v in image["versions"]:
      existing_images[image["name"]][v["digest"]] = v

  list_images_cmd = [
      "gcloud", "--project=kubeflow-images-public", "container", "images",
      "list", "--format=json"
  ]
  # By default gcloud uses gcr.io/[project] as the repository. However for
  # images like katib, we may need to specify the repository as
  # gcr.io/[project]/katib.
  if args.repository:
    list_images_cmd.append("--repository=" + args.repository)
  raw_images = util.run(list_images_cmd)

  all_images = json.loads(raw_images)
  name_pattern, tag_pattern = args.pattern.split(":")

  name_re = re.compile(name_pattern)
  tag_re = re.compile(tag_pattern)

  matching = []
  for image in all_images:
    if not name_re.match(image["name"]):
      continue
    logging.info("Matching image: %s", image["name"])
    matching.append(image)

  # For each image ist all tags and find the matching ones
  images_to_add = {}
  for image in matching:
    raw_tags = util.run([
        "gcloud", "--project=kubeflow-images-public", "container", "images",
        "list-tags", image["name"], "--format=json"
    ])

    tags = json.loads(raw_tags)

    for info in tags:
      for t in info["tags"]:
        if tag_re.match(t):
          is_match = True
          versions = images_to_add.get(image["name"], {})
          versions[info["digest"]] = info
          images_to_add[image["name"]] = versions

  # Merge in any missing versions
  for name, versions in images_to_add.iteritems():
    if name not in existing_images:
      existing_images[name] = {}

    for v in versions.itervalues():
      if v["digest"] in existing_images[name]:
        logging.info("Image %s sha %s already defined.", name, v["digest"])
      else:
        logging.info("Image %s adding sha %s", name, v["digest"])
        existing_images[name][v["digest"]] = v

  # Convert to the expected output
  output = {}
  output["images"] = []

  names = sorted(existing_images.keys())
  for name in names:
    versions = existing_images[name]
    new_image = {}
    new_image["name"] = name
    new_image["versions"] = []
    for v in versions.itervalues():
      new_image["versions"].append(v)

    output["images"].append(new_image)

  with open(args.images_file, "w") as hf:
    hf.write(yaml.safe_dump(output, default_flow_style=False))
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

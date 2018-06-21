"""Apply the image tags as defined in image_tags.yaml"""

import argparse
import logging
import yaml

from kubeflow.testing import util

def main(unparsed_args=None):  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO) # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(
    description="Apply tags to file")

  parser.add_argument(
    "--images_file",
    default="image_tags.yaml",
    type=str,
    help="Yaml file containing the tags to attach.")

  args = parser.parse_args()

  with open(args.images_file) as hf:
    config = yaml.load(hf)

  for image in config["images"]:
    for tag in image["tags"]:
      # TODO(jlewi): This appears to be really slow even when we aren't
      # moving the image. Much slower than doing it in the UI
      util.run(["gcloud", "container", "images", "add-tag", "--quiet",
                image["image"], tag])

  logging.info("Done.")

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
"""Utilities for updating various Kubeflow applications."""

import logging
import os

from kubeflow.testing import util # pylint: disable=no-name-in-module

import yaml

def set_kustomize_image(kustomize_file, image_name, image):
  """Set the image using kustomize.

  Args:
    kustomize_file: Path to the kustomize file
    image_name: The name for the image as defined in the images section
      of the kustomization file
    image: New image to set

  Returns:
    True if the image was updated and false other wise
  """
  kustomize_dir = os.path.dirname(kustomize_file)

  with open(kustomize_file) as hf:
    config = yaml.load(hf)

  old_image = ""
  for i in config.get("images"):
    if i["name"] == image_name:
      old_image = i.get("newName", image_name) + ":" + i.get("newTag", "")
      break

  if old_image == image:
    logging.info("Not updating %s; image is already %s", kustomize_file,
                     image)

    return False

  util.run(["kustomize", "edit", "set", "image",
            "{0}={1}".format(image_name, image)],
           cwd=kustomize_dir)

  return True
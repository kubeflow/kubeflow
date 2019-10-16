"""Utilities for updating various Kubeflow applications."""

import logging
import os
import pathlib
import tempfile

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

def regenerate_manifest_tests(manifests_dir):
  """Regenerate manifest tests

  Args:
    manifests_dir: Directory where kubeflow/manifests is
      checked out
  """
  # See https://github.com/kubeflow/manifests/issues/317
  # We can only run make generate under our GOPATH
  # So first we have to ensure the source code is linked
  # from our gopath.
  go_path = os.getenv("GOPATH")

  if not go_path:
    raise ValueError("GOPATH not set")

  parent_dir = os.path.join(go_path, "src",
                            "github.com", "kubeflow")

  if not os.path.exists(parent_dir):
    logging.info("Creating directory %s", parent_dir)
    os.makedirs(parent_dir)
  else:
    logging.info("Directory %s already exists", parent_dir)

  target = os.path.join(parent_dir, "manifests")

  if os.path.exists(target):
    logging.info("%s already exists", target)
    p = pathlib.Path(target)
    if p.resolve() != pathlib.Path(manifests_dir):
      raise ValueError("%s exists but doesn't point to %s",
                       target, manifests_dir)
  else:
    logging.info("Creating symlink %s -> %s", target, manifests_dir)
    os.symlink(manifests_dir, target)

  test_dir = os.path.join(target, "tests")
  with tempfile.NamedTemporaryFile(delete=False, mode="w") as hf:
    hf.write("#!/bin/bash\n")
    hf.write("set -ex\n")
    hf.write("cd {0}\n".format(test_dir))
    hf.write("make generate \n")
    script = hf.name

  # TODO(jlewi): This is a weird hack to run make generate for the tests.
  # make generate needs to be run from ${GOPATH}/src/kubeflow/manifests.
  # Simply setting cwd doesn't appear to impact the script; probably something
  # to do with symlinks? So we write a simply script that executes a CD
  # and then runs make generate.
  util.run(["bash", script], cwd=os.path.join(target, "tests"))

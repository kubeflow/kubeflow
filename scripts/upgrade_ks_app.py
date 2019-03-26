#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import logging
import os.path
import shutil
import subprocess
import yaml

# The path used by the bootstrapper
BOOTSTRAPPER_REGISTRY = "/opt/registries/kubeflow/kubeflow"

# The current release of Kubeflow. This should be upgraded on every release.
CURRENT_RELEASE = "github.com/kubeflow/kubeflow/tree/v0.2.0-rc.1/kubeflow"

# The default name for the registry.
DEFAULT_REGISTRY_NAME = "kubeflow"


def main():
  logging.basicConfig(
      level=logging.INFO,
      format="%(levelname)s|%(asctime)s %(message)s",
      datefmt="%Y-%m-%dT%H:%M:%S",
  )
  logging.getLogger().setLevel(logging.INFO)

  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--app_dir",
      default=os.getcwd(),
      type=str,
      help="The directory of the ksonnet app.")
  parser.add_argument(
      "--registry",
      default=CURRENT_RELEASE,
      type=str,
      help=(
          "The Kubeflow registry to use. This can be a GitHub link like "
          "{0} that points at a specific version of the registry. "
          "To specify the name of the registry in your ksonnet app "
          "you can use the from <name>=<registry URL>").format(CURRENT_RELEASE))

  args = parser.parse_args()

  if "=" in args.registry:
    registry_name, registry_url = args.registry.split("=", 1)
  else:
    registry_name = DEFAULT_REGISTRY_NAME
    registry_url = args.registry

  app_dir = args.app_dir
  logging.info("Processing app: %s", app_dir)
  with open(os.path.join(app_dir, "app.yaml"), "r") as f:
    app = yaml.load(f)

  registries = app['registries']
  libraries = app['libraries']

  for name in registries.iterkeys():
    if name != registry_name:
      logging.info("Skipping registry %s", name)
      continue

    if registries[name]["uri"].startswith("file"):
      # File registries are not stored in .ksonnet
      # TODO(jlewi): This messes with bootstrapper because we might want  to
      # switch from using the file URI to using the git location.
      logging.info("Skipping registry %s because it is a file URI" % name)
      continue
    target = os.path.join(app_dir, ".ksonnet/registries", name)
    if not os.path.exists(target):
      logging.info("Warning directory %s doesn't exist; skipping" % target)
      continue
    shutil.rmtree(target)

  libs_to_remove = []
  for name in libraries.iterkeys():
    lib_registry = libraries[name]["registry"]
    if lib_registry != registry_name:
      continue
    libs_to_remove.append(name)
    target = os.path.join(app_dir, "vendor", lib_registry, name)
    if not os.path.exists(target):
      logging.info("Directory does not exist: %s", target)
      continue
    shutil.rmtree(target)

  # Remove the registry from app.yaml
  if registry_name in app["registries"]:
    del app["registries"][registry_name]

  # Remove libraries from this registry
  for lib in libs_to_remove:
    del app["libraries"][lib]

  with open('app.yaml', 'w') as f:
    yaml.dump(app, f, default_flow_style=False)

  logging.info("Adding registry %s point at %s", registry_name, registry_url)
  subprocess.call(['ks', 'registry', 'add', registry_name, registry_url])

  for name in libs_to_remove:
    package = "{0}/{1}".format(registry_name, name)
    logging.info("Installing package %s", package)
    subprocess.call(['ks', 'pkg', 'install', package])


if __name__ == "__main__":
  main()

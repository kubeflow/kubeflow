# -*- coding: utf-8 -*-
"""Script to build images.

For example,
python build_image.py --tf_version=1.6 --platform=gpu tf_serving
"""
import argparse
import datetime
from itertools import chain
import logging
import os
import subprocess
import sys
import time
import yaml


def run(command,
        cwd=None,
        env=None,
        polling_interval=datetime.timedelta(seconds=1)):
  """Run a subprocess.
  Copied from kubeflow/test so it's easier to run locally.
  TODO(lunkai): refactor to dedup.
  Any subprocess output is emitted through the logging modules.
  Returns:
    output: A string containing the output.
  """
  logging.info("Running: %s \ncwd=%s", " ".join(command), cwd)

  if not env:
    env = os.environ
  else:
    keys = sorted(env.keys())

    lines = []
    for k in keys:
      lines.append("{0}={1}".format(k, env[k]))
    logging.info("Running: Environment:\n%s", "\n".join(lines))

  process = subprocess.Popen(
      command,
      cwd=cwd,
      env=env,
      stdout=subprocess.PIPE,
      stderr=subprocess.STDOUT)

  logging.info("Subprocess output:\n")
  output = []
  while process.poll() is None:
    process.stdout.flush()
    for line in iter(process.stdout.readline, b''):
      output.append(line.strip())
      logging.info(line.strip())

    time.sleep(polling_interval.total_seconds())

  process.stdout.flush()
  for line in iter(process.stdout.readline, b''):
    output.append(line.strip())
    logging.info(line.strip())

  if process.returncode != 0:
    raise subprocess.CalledProcessError(
        process.returncode, "cmd: {0} exited with code {1}".format(
            " ".join(command), process.returncode), "\n".join(output))

  return "\n".join(output)


def wait_for_docker_daemon(timeout=60):
  """Waiting for docker daemon to be ready. This is needed in DinD scenario."""
  start_time = time.time()
  while time.time() - start_time < timeout:
    try:
      subprocess.check_call(["docker", "ps"])
    except subprocess.CalledProcessError:
      time.sleep(5)
    # Daemon ready.
    logging.info("docker daemon ready.\n")
    return
  # Timeout.
  logging.error("Timeout waiting for docker daemon\n")
  # TODO(lunkai): use TimeoutError when we use py3.
  raise RuntimeError


def get_build_args(config):
  """
  Make the list of params for docker build from config.

  For example, if the config is {"a": 1, "b": 2}
  This should return
  ["--build-arg", "a=1", "--build-arg", "b=2"]
  """
  config_list = [key + "=" + val for key, val in config.items()]
  return list(chain.from_iterable([["--build-arg", x] for x in config_list]))


def get_config(context_dir, version):
  """Returns a dict of configuration from the version-config file."""
  config_file = os.path.join(context_dir, "versions", version,
                             "version-config.json")
  with open(config_file) as f:
    config = yaml.load(f)
  return config


def build_tf_serving(args):
  wait_for_docker_daemon()
  dir_path = os.path.dirname(os.path.realpath(__file__))
  context_dir = os.path.join(dir_path, "k8s-model-server/images")
  version = args.tf_version if args.platform == "cpu" else args.tf_version + "gpu"

  config = get_config(context_dir, version)
  build_args = get_build_args(config)
  image_name = "{}/tensorflow-serving-{}:{}".format(args.registry, version,
                                                    args.tag)

  command = list(
      chain(
          ["docker", "build", "--pull"], build_args,
          ["-t", image_name, "-f", "Dockerfile.{}".format(args.platform), "."]))
  run(command, cwd=context_dir)

  if args.push_gcr:
    run([
        "gcloud", "auth", "activate-service-account", "--key-file",
        os.environ['GOOGLE_APPLICATION_CREDENTIALS']
    ])
    run(["gcloud", "docker", "--", "push", image_name])


def build_tf_notebook(args):
  wait_for_docker_daemon()
  dir_path = os.path.dirname(os.path.realpath(__file__))
  context_dir = os.path.join(dir_path, "tensorflow-notebook-image")
  version = args.tf_version if args.platform == "cpu" else args.tf_version + "gpu"

  config = get_config(context_dir, version)
  build_args = get_build_args(config)
  image_name = "{}/tensorflow-{}-notebook-{}:{}".format(
      args.registry, args.tf_version, args.platform, args.tag)

  command = list(
      chain(["docker", "build", "--pull"], build_args,
            ["-t", image_name, "-f", "Dockerfile", "."]))
  run(command, cwd=context_dir)

  if args.push_gcr:
    run([
        "gcloud", "auth", "activate-service-account", "--key-file",
        os.environ['GOOGLE_APPLICATION_CREDENTIALS']
    ])
    run(["gcloud", "docker", "--", "push", image_name])


def main():
  parser = argparse.ArgumentParser()
  subparsers = parser.add_subparsers()

  parser.add_argument(
      "--registry",
      default="gcr.io/kubeflow-images-public",
      help="The registry of the image")
  parser.add_argument("--tag", default="latest", help="The image tag")
  parser.add_argument("--tf_version", default="1.6", help="Tensorflow version")
  parser.add_argument("--platform", default="cpu", help="cpu or gpu")
  parser.add_argument(
      "--push_gcr",
      action='store_true',
      default=False,
      help="Whether to push the image after building.")

  parser_tf_serving = subparsers.add_parser("tf_serving")
  parser_tf_serving.set_defaults(func=build_tf_serving)

  parser_tf_notebook = subparsers.add_parser("tf_notebook")
  parser_tf_notebook.set_defaults(func=build_tf_notebook)

  args = parser.parse_args()
  args.func(args)


if __name__ == "__main__":
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  main()

import yaml
import logging
import sys

CONFIG = "/etc/config/spawner_ui_config.yaml"


def create_logger(name):
  handler = logging.StreamHandler(sys.stdout)
  handler.setFormatter(logging.Formatter(
      "%(asctime)s | %(name)s | %(levelname)s | %(message)s"))
  logger = logging.getLogger(name)
  logger.setLevel(logging.INFO)
  logger.addHandler(handler)
  return logger


# Functions for handling the JWT token
def load_file(filepath):
  with open(filepath, "r") as f:
    file_data = f.read().replace("\n", "")

  return file_data


# Functions for handling the config from which we load the default values
# for the form when adding a Notebook
def spawner_ui_config(username):
  c = None
  try:
    with open(CONFIG, "r") as f:
      c = f.read().format(username=username)
  except IOError:
    print("Error opening Spawner UI config file")

  try:
    if yaml.safe_load(c) is None:
      # YAML exists but is empty
      return {}
    else:
      # YAML exists and is not empty
      return yaml.safe_load(c)["spawnerFormDefaults"]
  except yaml.YAMLError:
    return None


# Since notebook is a CRD, we don't currently have k8s client functions to
# create the corresponding object.
def create_notebook_template():
  notebook = {
      "apiVersion": "kubeflow.org/v1alpha1",
      "kind": "Notebook",
      "metadata": {
          "name": "",
          "namespace": "",
          "labels": {
              "app": ""
          }
      },
      "spec": {
          "template": {
              "spec": {
                  "containers": [{
                      "name": "",
                      "volumeMounts": [],
                  }],
                  "ttlSecondsAfterFinished": 300,
                  "volumes": [],
              }
          }
      }
  }
  return notebook


def set_notebook_names(nb, body):
  nb["metadata"]["name"] = body["nm"]
  nb["metadata"]["labels"]["app"] = body["nm"]
  nb["spec"]["template"]["spec"]["containers"][0]["name"] = body["nm"]
  nb["metadata"]["namespace"] = body["ns"]


def set_notebook_image(nb, body):
  if body["imageType"] == "standard":
    image = body["standardImages"]
  else:
    image = body["customImage"]
  nb["spec"]["template"]["spec"]["containers"][0]["image"] = image


def set_notebook_cpu_ram(nb, body):
  notebook_cont = nb["spec"]["template"]["spec"]["containers"][0]

  notebook_cont["resources"] = {
      "requests": {
          "cpu": body["cpu"],
          "memory": body["memory"]
      }
  }


def add_notebook_volume(nb, vol, claim, mnt_path):
  # Create the volume in the Pod
  notebook_spec = nb["spec"]["template"]["spec"]
  notebook_cont = nb["spec"]["template"]["spec"]["containers"][0]

  volume = {"name": vol, "persistentVolumeClaim": {"claimName": claim}}
  notebook_spec["volumes"].append(volume)

  # Container volumeMounts
  mnt = {"mountPath": mnt_path, "name": vol}
  notebook_cont["volumeMounts"].append(mnt)

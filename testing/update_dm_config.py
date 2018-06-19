"""Update the deployment manager config according to flags"""
import argparse
import logging
import os

import yaml
from kubeflow.testing import test_helper


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
    "--bootstrapper_image",
    required=False,
    type=str,
    help="The bootstrapper image for deployment.")

  parser.add_argument(
    "--tfjob_version",
    required=True,
    type=str,
    help="The tfjob version to deploy.")

  parser.add_argument(
    "--ip_name",
    required=True,
    type=str,
    help="The ip name to use for kubeflow deployment.")

  parser.add_argument(
    "--hostname",
    required=True,
    type=str,
    help="The hostname to use for kubeflow deployment.")

  parser.add_argument(
    "--config",
    required=True,
    type=str,
    help="The path to the YAML file for the deployment config to use.")

  args, _ = parser.parse_known_args()
  return args


def update_bootstrapper_config(config, tfjob_version, ip_name, hostname,
                               bootstrapper_image):
  bootstrapper_config = yaml.load(
    config['resources'][0]['properties']['bootstrapperConfig'])
  for param in bootstrapper_config['app']['parameters']:
    if param['name'] == 'ipName':
      param['value'] = ip_name
    if param['name'] == 'hostname':
      param['value'] = hostname
  bootstrapper_config['app']['parameters'].append({
    'component': 'kubeflow-core',
    'name': 'tfJobVersion',
    'value': tfjob_version
  })
  config['resources'][0]['properties']['bootstrapperConfig'] = yaml.dump(
    bootstrapper_config)
  if bootstrapper_image:
    config['resources'][0]['properties'][
      'bootstrapperImage'] = bootstrapper_image



def update_dm_config(_):
  """Deploy Kubeflow."""
  args = parse_args()
  with open(args.config) as cf:
    content = cf.read()
    content_yaml = yaml.load(content)
  update_bootstrapper_config(content_yaml, args.tfjob_version, args.ip_name,
                             args.hostname, args.bootstrapper_image)
  with open(args.config, 'w') as cf:
    cf.write(yaml.dump(content_yaml))


def main():
  test_case = test_helper.TestCase(
    name='update_dm_config', test_func=update_dm_config)
  test_suite = test_helper.init(name='update_dm_config', test_cases=[test_case])
  test_suite.run()


if __name__ == "__main__":
  main()

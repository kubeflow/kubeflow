#!/usr/bin/env python
# -*- coding: utf-8 -*-

# A python script which manages IAM binding patches declaratively IAM policy
# patch can be defined in a separate file declaratively and it can either be
# added or removed from a projects iam policy
#
# Usage
#   python iam_patch.py --action=add --project=agwliamtest \
#     --iam_bindings_file=iam_bindings.yaml
#   python iam_patch.py --action=remove --project=agwliamtest \
#     --iam_bindings_file=iam_bindings.yaml
import argparse
import logging
import subprocess
import sys
import tempfile
import time
import yaml


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--action",
      default="add",
      type=str,
      help=("The action to take. Valid values: add, remove"))
  parser.add_argument(
      "--project", default=None, type=str, help=("The project."))
  parser.add_argument(
      "--iam_bindings_file",
      default=None,
      type=str,
      help=("The IAM bindings file."))
  parser.set_defaults(dry_run=False)
  parser.add_argument(
      '--dry_run',
      dest='dry_run',
      action='store_true',
      help=("Don't patch the final IAM policy, only print it"))  # noqa: E501
  return parser.parse_args()


def get_current_iam_policy(project):
  """Fetches and returns the current iam policy as a yaml object"""
  return yaml.load(
      subprocess.check_output(["gcloud", "projects", "get-iam-policy",
                               project]))


def iam_policy_to_dict(bindings):
  """
  iam_policy_to_dict takes an iam policy binding in the GCP API format and
  converts it into a python dict so that it can be easily updated
  """
  bindings_dict = dict()
  for binding in bindings:
    role = binding['role']
    bindings_dict[role] = set(binding['members'])
  return bindings_dict


def iam_dict_to_policy(bindings_dict):
  """
  iam_dict_to_policy takes an iam policy binding in the dict format and
  converts it into GCP API format so that it can be sent to GCP IAM API for
  an update
  """
  bindings = []
  for k, v in bindings_dict.items():
    bindings.append({"role": k, "members": list(v)})
  return bindings


def apply_iam_bindings_patch(current_policy, bindings_patch, action):
  """
  Patches the current policy with the supplied patch.
  action can be add or remove.
  """
  for item in bindings_patch['bindings']:
    members = item['members']
    roles = item['roles']
    for role in roles:
      if role not in current_policy.keys():
        current_policy[role] = set()
      if action == "add":
        current_policy[role].update(members)
      else:
        current_policy[role].difference_update(members)
  return current_policy


def patch_iam_policy(args):
  """
  Fetches the current IAM policy, patches it with the bindings supplied in
  --iam_bindings_file and updates the new iam policy
  """
  current_policy = get_current_iam_policy(args.project)
  logging.info("Current IAM Policy")
  logging.info(
      yaml.dump(current_policy, default_flow_style=False, default_style=''))
  current_policy_bindings_dict = iam_policy_to_dict(current_policy['bindings'])
  with open(args.iam_bindings_file) as iam_bindings_file:
    bindings_patch = yaml.load(iam_bindings_file.read())
  current_policy_bindings_dict = apply_iam_bindings_patch(
      current_policy_bindings_dict, bindings_patch, args.action)
  current_policy['bindings'] = iam_dict_to_policy(current_policy_bindings_dict)
  logging.info("Updated Policy")
  logging.info("\n" + yaml.dump(
      current_policy, default_flow_style=False, default_style=''))
  updated_policy_file = tempfile.NamedTemporaryFile(delete=False)
  with open(updated_policy_file.name, 'w') as f:
    yaml.dump(current_policy, f, default_flow_style=False)
  logging.debug("Temp file %s", updated_policy_file.name)
  if not args.dry_run:
    subprocess.call([
        "gcloud", "projects", "set-iam-policy", args.project,
        updated_policy_file.name
    ])
  else:
    logging.info("Skipping patching the IAM policy because --dry_run was set")


if __name__ == "__main__":
  logging.getLogger().setLevel(logging.INFO)
  args = parse_args()

  if args.action not in ["add", "remove"]:
    raise ValueError("invalid --action. Valid values are add, remove")

  for i in range(5):
    try:
      patch_iam_policy(args)
      logging.info("Successfully patched IAM policy")
      break
    except Exception as e:
      logging.error(e)
      if i < 4:
        logging.info("Retrying in 15 seconds..")
        time.sleep(15)
      else:
        logging.error("Patching IAM policy failed")
        sys.exit(1)

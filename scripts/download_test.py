# -*- coding: utf-8 -*-
"""Unittest for Download script.

We use a Python runner to facilitate integration into an E2E workflow.
"""
import tempfile
import os
import subprocess


def main():  # pylint: disable=too-many-locals
  name = tempfile.mkdtemp()
  download_script = os.path.join(os.path.dirname(__file__), "download.sh")
  subprocess.check_call(download_script, cwd=name)

  missing = []
  for d in ["kubeflow", "scripts"]:
    if not os.path.exists(os.path.join(name, d)):
      missing.append(d)

  if missing:
    raise ValueError("Missing directories: " + ",".join(missing))


if __name__ == "__main__":
  main()

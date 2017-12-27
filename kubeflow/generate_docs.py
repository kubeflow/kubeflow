#!/usr/bin/python
#
# This script assumes you ran go install github.com/ksonnet/parts/doc-gen

import glob
import os
import subprocess

if __name__ == "__main__":
  this_dir = os.path.dirname(__file__)

  GOPATH = os.getenv("GOPATH")
  doc_gen = os.path.join(GOPATH, "bin/doc-gen")
  for f in os.listdir(this_dir):
    full_dir = os.path.join(this_dir, f)
    if not os.path.isdir(f):
      continue
    prototypes = glob.glob(os.path.join(full_dir, "prototypes/*.jsonnet"))


    command = [doc_gen, os.path.join(full_dir, "parts.yaml")]
    command.extend(prototypes)
    with open(os.path.join(full_dir, "README.md"), "w") as hout:
      subprocess.check_call(command, stdout=hout)

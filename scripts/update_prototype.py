# -*- coding: utf-8 -*-
"""
This script updates parameters values in jsonnet configs.
Example
  python update_prototype --file=all.jsonnet \
    --values=tfJobImage=gcr.io/kubeflow/tf-operator:v20180301
will change lines with a format like
// @optionalParam tfJobImage string gcr.io/kubeflow-images-public/tf_operator:v20180226-403 The image for the TfJob controller.  # noqa: E501
and
tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:v20180226-403",
to
// @optionalParam tfJobImage string gcr.io/kubeflow/tf-operator:v20180301
and
tfJobImage:: "gcr.io/kubeflow/tf-operator:v20180301",
respectively.
"""
import argparse
import os
import re


def main():
  parser = argparse.ArgumentParser(
      description="Update ksonnet prototypes parameters' values")
  parser.add_argument(
      "--file", action="store", dest="file", help="Prototype file name")
  parser.add_argument(
      "--values",
      action="store",
      dest="values",
      help="Comma separated param=value pairs. Ex.: a=b,c=1")
  args = parser.parse_args()

  if not os.path.exists(args.file):
    raise IOError("File " + args.file + " not found!")

  regexps = {}
  for pair in args.values.split(","):
    if "=" not in pair:
      raise Exception(("Malformed --values. Values pairs must contain =, e.g. "
                       "param=value"))
    param, value = pair.split("=")
    r = re.compile(r"([ \t]*" + param + ":+ ?\"?)[^\",]+(\"?,?)")
    v = r"\g<1>" + value + r"\2"
    regexps[param] = (r, v, value)

  with open(args.file) as f:
    prototype = f.read().split("\n")
  replacements = 0
  for i, line in enumerate(prototype):
    for param in regexps.keys():
      if param not in line:
        continue
      if line.startswith("//"):
        prototype[i] = re.sub(
            r"(// @\w+ )" + param + r"( \w+ )[^ ]+(.*)",  # noqa: W605
            r"\g<1>" + param + r"\2" + regexps[param][2] + r"\3",
            line)
        replacements += 1
        continue
      prototype[i] = re.sub(regexps[param][0], regexps[param][1], line)
      if line != prototype[i]:
        replacements += 1
  if replacements == 0:
    raise Exception(
        "No replacements made, are you sure you specified correct param?")
  if replacements < len(regexps):
    raise Warning("Made less replacements then number of params. Typo?")
  temp_file = args.file + ".tmp"
  with open(temp_file, "w") as w:
    w.write("\n".join(prototype))
  os.rename(temp_file, args.file)
  print("Successfully made %d replacements" % replacements)


if __name__ == "__main__":
  main()

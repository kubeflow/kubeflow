# Script to build bootstrapper image
import argparse
import os
import shutil
import yaml

FILE_PATH = os.path.dirname(os.path.abspath(__file__))
REG_FOLDER = "reg_tmp"

# Clone repos to tmp folder and build docker images
def main(unparsed_args=None):
  parser = argparse.ArgumentParser(
    description="Build bootstrapper image with ksonnet registries specified in config.")

  parser.add_argument(
    "--image",
    default="",
    type=str,
    help="Image name.")
  parser.add_argument(
    "--build_opts",
    default="",
    type=str,
    help="Docker build opts.")
  parser.add_argument(
    "--config",
    default="config/default.yaml",
    type=str,
    help="Relative path to bootstrapper config file specify which registries to include.")
  parser.add_argument(
    "--test_registry",
    default="",
    type=str,
    help="e2e test target registry, format is <registry name>:<registry path>")


  args = parser.parse_args(args=unparsed_args)
  tmp_dir = os.path.join(FILE_PATH, REG_FOLDER)

  # Make local dir, clone repos into it and Docker build will copy whole folder.
  if os.path.exists(tmp_dir):
    shutil.rmtree(tmp_dir)
  os.mkdir(tmp_dir)
  with open(os.path.join(FILE_PATH, args.config), 'r') as conf_input:
    conf = yaml.load(conf_input)

  for reg in conf['registries']:
    if "repo" in reg and "branch" in reg:
      reg_path = os.path.join(tmp_dir, reg["name"])
      print("Adding registry %s from %s %s" % (reg["name"], reg["repo"], reg["branch"]))
      os.system("git clone --depth 1 --branch %s %s %s" % (reg["branch"], reg["repo"], reg_path))
    else:
      if args.test_registry != "" and args.test_registry.split(":")[0] == reg["name"]:
        src_registry = os.path.join(args.test_registry.split(":")[1], reg["path"])
        reg_path = os.path.join(tmp_dir, *os.path.join(reg["name"], reg["path"]).split('/')[:-1])
        if not os.path.exists(reg_path):
          os.makedirs(reg_path)
        print("cp -r %s %s" % (src_registry, reg_path))
        os.system("cp -r %s %s" % (src_registry, reg_path))

  os.system("docker build %s -t %s %s --build-arg registries=%s" %
            (args.build_opts, args.image, FILE_PATH, REG_FOLDER))

if __name__ == '__main__':
  main()

"""A simple utility to convert a manifest to corresponding jsonnet."""
import argparse
import json
import yaml
if __name__ == "__main__":
  parser = argparse.ArgumentParser(description="Convert manifest.")
  parser.add_argument(
    "--manifest",
    type=str,
    required=True,
  )

  args = parser.parse_args()

  with open(args.manifest) as hf:
    manifest = hf.read()

  components = manifest.split("---")

  index = 0
  for c in components:
    t = c.strip()
    if not t:
      continue

    d = yaml.load(t)
    j = json.dumps(d, indent=2, sort_keys=True)
    print("component_{0} = {1};\n".format(index, j))
    index += 1

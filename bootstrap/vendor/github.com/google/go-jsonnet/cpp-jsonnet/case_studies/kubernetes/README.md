# Kubernetes Example

This Kubernetes example is based on https://github.com/vasanthbala/hackathon/tree/master/kbp/redis

Generate the yaml (actually json) files for Kubernetes:

```sh
jsonnet -m example.jsonnet
```

Check they are the same as the original handwritten files:

```sh
python test_same.py
```

Clean up

```sh
rm -v *.out *.new.yaml
```

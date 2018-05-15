## ks upgrade

Upgrade ks configuration

### Synopsis


The upgrade command upgrades a ksonnet application to the latest version.

### Syntax

	Example:

# Upgrade ksonnet application in dry-run mode to see the changes to be performed by the
# upgrade process.
ks upgrade --dry-run

# Upgrade ksonnet application. This will update app.yaml to apiVersion 0.1.0
# and migrate environment spec.json files to `app.yaml`.
ks upgrade


```
ks upgrade [--dry-run] [flags]
```

### Options

```
      --dry-run   Dry-run upgrade process. Prints out changes.
  -h, --help      help for upgrade
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster


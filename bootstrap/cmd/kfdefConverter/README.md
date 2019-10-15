# KfDef version converter

## Overview

This is a simple helper CLI that converts KfDef between versions.

## Usage

```
A simple CLI to convert KfDef from v1alpha1 to v1beta1

Usage:
  kfdef-converter [command]

Available Commands:
  help        Help about any command
  tov1beta1   Convert a KfDef config in v1alpha1 into v1beta1 format.

Flags:
  -h, --help   help for kfdef-converter

Use "kfdef-converter [command] --help" for more information about a command.
```

### Example conversion

Converting to `v1beta1`:
```bash
kfdef-converter tov1beta1 foo/kfdef.yaml -o path/to/output.yaml
```

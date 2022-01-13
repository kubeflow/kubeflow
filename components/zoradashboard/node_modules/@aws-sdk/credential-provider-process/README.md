# @aws-sdk/credential-provider-process

[![NPM version](https://img.shields.io/npm/v/@aws-sdk/credential-provider-process/latest.svg)](https://www.npmjs.com/package/@aws-sdk/credential-provider-process)
[![NPM downloads](https://img.shields.io/npm/dm/@aws-sdk/credential-provider-process.svg)](https://www.npmjs.com/package/@aws-sdk/credential-provider-process)

## AWS Credential Provider for Node.JS - Shared Configuration Files

This module provides a function, `fromSharedConfigFiles` that will create
`CredentialProvider` functions that read from a shared credentials file at
`~/.aws/credentials` and a shared configuration file at `~/.aws/config`. Both
files are expected to be INI formatted with section names corresponding to
profiles. Sections in the credentials file are treated as profile names, whereas
profile sections in the config file must have the format of`[profile profile-name]`, except for the default profile. Please see the [sample
files](#sample-files) below for examples of well-formed configuration and
credentials files.

Profiles that appear in both files will not be merged, and the version that
appears in the credentials file will be given precedence over the profile found
in the config file.

## Supported configuration

You may customize how credentials are resolved by providing an options hash to
the `fromSharedConfigFiles` factory function. The following options are
supported:

- `profile` - The configuration profile to use. If not specified, the provider
  will use the value in the `AWS_PROFILE` environment variable or a default of
  `default`.
- `filepath` - The path to the shared credentials file. If not specified, the
  provider will use the value in the `AWS_SHARED_CREDENTIALS_FILE` environment
  variable or a default of `~/.aws/credentials`.
- `configFilepath` - The path to the shared config file. If not specified, the
  provider will use the value in the `AWS_CONFIG_FILE` environment variable or a
  default of `~/.aws/config`.

## Sample files

### `~/.aws/credentials`

```ini
[default]
credential_process = /usr/local/bin/awscreds

[dev]
credential_process = /usr/local/bin/awscreds dev

[prod]
credential_process = /usr/local/bin/awscreds prod
```

### `~/.aws/config`

```ini
[default]
credential_process = /usr/local/bin/awscreds

[profile dev]
credential_process = /usr/local/bin/awscreds dev

[profile prod]
credential_process = /usr/local/bin/awscreds prod
```

# @aws-sdk/credential-provider-node

[![NPM version](https://img.shields.io/npm/v/@aws-sdk/credential-provider-node/latest.svg)](https://www.npmjs.com/package/@aws-sdk/credential-provider-node)
[![NPM downloads](https://img.shields.io/npm/dm/@aws-sdk/credential-provider-node.svg)](https://www.npmjs.com/package/@aws-sdk/credential-provider-node)

## AWS Credential Provider for Node.JS

This module provides a factory function, `fromEnv`, that will attempt to source
AWS credentials from a Node.JS environment. It will attempt to find credentials
from the following sources (listed in order of precedence):
_ Environment variables exposed via `process.env`
_ Shared credentials and config ini files \* The EC2/ECS Instance Metadata Service

The default credential provider will invoke one provider at a time and only
continue to the next if no credentials have been located. For example, if the
process finds values defined via the `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY` environment variables, the files at `~/.aws/credentials`
and `~/.aws/config` will not be read, nor will any messages be sent to the
Instance Metadata Service.

If invalid configuration is encountered (such as a profile in
`~/.aws/credentials` specifying as its `source_profile` the name of a profile
that does not exist), then the chained provider will be rejected with an error
and will not invoke the next provider in the list.

## Supported configuration

You may customize how credentials are resolved by providing an options hash to
the `defaultProvider` factory function. The following options are
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
- `mfaCodeProvider` - A function that returns a a promise fulfilled with an
  MFA token code for the provided MFA Serial code. If a profile requires an MFA
  code and `mfaCodeProvider` is not a valid function, the credential provider
  promise will be rejected.
- `roleAssumer` - A function that assumes a role and returns a promise
  fulfilled with credentials for the assumed role. If not specified, the SDK
  will create an STS client and call its `assumeRole` method.
- `timeout` - The connection timeout (in milliseconds) to apply to any remote
  requests. If not specified, a default value of `1000` (one second) is used.
- `maxRetries` - The maximum number of times any HTTP connections should be
  retried. If not specified, a default value of `0` will be used.

## Related packages:

- [AWS Credential Provider for Node.JS - Environment Variables](../credential-provider-env)
- [AWS Credential Provider for Node.JS - Shared Configuration Files](../credential-provider-ini)
- [AWS Credential Provider for Node.JS - Instance and Container Metadata](../credential-provider-imds)
- [AWS Shared Configuration File Loader](../shared-ini-file-loader)

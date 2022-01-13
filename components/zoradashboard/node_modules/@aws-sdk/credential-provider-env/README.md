# @aws-sdk/credential-provider-env

[![NPM version](https://img.shields.io/npm/v/@aws-sdk/credential-provider-env/latest.svg)](https://www.npmjs.com/package/@aws-sdk/credential-provider-env)
[![NPM downloads](https://img.shields.io/npm/dm/@aws-sdk/credential-provider-env.svg)](https://www.npmjs.com/package/@aws-sdk/credential-provider-env)

## AWS Credential Provider for Node.JS - Environment Variables

This module provides a `CredentialProvider` function, `fromEnv`, that reads from
the following environment variables:

- `AWS_ACCESS_KEY_ID` - The access key for your AWS account.
- `AWS_SECRET_ACCESS_KEY` - The secret key for your AWS account.
- `AWS_SESSION_TOKEN` - The session key for your AWS account. This is only
  needed when you are using temporary credentials.
- `AWS_CREDENTIAL_EXPIRATION` - The expiration time of the credentials contained
  in the environment variables described above. This value must be in a format
  compatible with the [ISO-8601 standard](https://en.wikipedia.org/wiki/ISO_8601)
  and is only needed when you are using temporary credentials.

If either the `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` environment
variable is not set or contains a falsy value, the promise returned by the
`fromEnv` function will be rejected.

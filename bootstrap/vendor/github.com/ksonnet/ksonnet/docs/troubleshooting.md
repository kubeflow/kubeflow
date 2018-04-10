# Troubleshooting

## ERROR user: Current not implemented on linux/amd64
If you encounter this error when running the ksonnet Linux binary, you can temporarily work around it by setting the `USER` environment variable (e.g. `export USER=your-username`).

This error results from cross-compilation (Linux on Mac). To avoid this, future binaries will be built on the appropriate target machines.

## Github rate limiting errors

If you get an error saying something to the effect of `403 API rate limit of 60 still exceeded` you can work around that by getting a Github personal access token and setting it up so that `ks` can use it.  Github has higher rate limits for authenticated users than unauthenticated users.

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens) and generate a new token. You don't have to give it any access at all as you are simply authenticating.
2. Make sure you save that token someplace because you can't see it again.  If you lose it you'll have to delete and create a new one.
3. Set an environment variable in your shell: `export GITHUB_TOKEN=<token>`.  You may want to do this as part of your shell startup scripts (i.e. `.profile`).

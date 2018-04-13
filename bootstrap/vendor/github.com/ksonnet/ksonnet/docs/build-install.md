# Manually build and install `ks`

Copy and paste the following commands:
```bash
# Clone the ksonnet repo into your GOPATH
go get github.com/ksonnet/ksonnet

# Build and install binary under shortname `ks` into $GOPATH/bin
cd $GOPATH/src/github.com/ksonnet/ksonnet
make install
```

If your ksonnet is properly installed, you should be able to run `ks --help` and see output describing the various `ks` commands.

## Common issues

* **If your error is "open /bin/ks: operation not permitted", ensure that your `$GOPATH` is set appropriately.**
  If `echo $GOPATH` results in empty output, you'll need to set it.
  If you're using macOS, trying adding the line `export GOPATH=$HOME/go` to the end of your `$HOME/.bash_profile`.

  Other systems may have different `$GOPATH` defaults (e.g. `/usr/local/go`), in which case you should use those instead.
  (If you get stuck, [these instructions](https://github.com/golang/go/wiki/SettingGOPATH) may help).

  The ksonnet Makefile assumes you have one and only one directory in your `$GOPATH`.

* **You may need to specify your `$GOPATH` in the same command as `make install`.**
  For example, try `GOPATH=<your-go-path> make install` (making sure to replace `<your-go-path>`), instead of just `make install`.

* **If your error is "command not found", make sure that Go binaries are included in your $PATH**.
  You can do this by running `PATH=$PATH:$GOPATH/bin`.

# go-jsonnet

[![GoDoc Widget]][GoDoc] [![Travis Widget]][Travis] [![Coverage Status Widget]][Coverage Status]

[GoDoc]: https://godoc.org/github.com/google/go-jsonnet
[GoDoc Widget]: https://godoc.org/github.com/google/go-jsonnet?status.png
[Travis]: https://travis-ci.org/google/go-jsonnet
[Travis Widget]: https://travis-ci.org/google/go-jsonnet.svg?branch=master
[Coverage Status Widget]: https://coveralls.io/repos/github/google/go-jsonnet/badge.svg?branch=master
[Coverage Status]: https://coveralls.io/github/google/go-jsonnet?branch=master

This an implementation of [Jsonnet](http://jsonnet.org/) in pure Go.  It is
feature complete but is not as heavily exercised as the [Jsonnet C++
implementation](https://github.com/google/jsonnet).  Please try it out and give
feedback.

This code is known to work on Go 1.8 and above. We recommend always using the newest stable release of Go.

## Build instructions

```bash
export GOPATH=$HOME/go-workspace
mkdir -pv $GOPATH
go get github.com/google/go-jsonnet
cd $GOPATH/src/github.com/google/go-jsonnet
cd jsonnet
go build
./jsonnet /dev/stdin <<< '{x: 1, y: self.x} + {x: 10}'
{
   "x": 10,
   "y": 10
}
```

## Running tests

```bash
./tests.sh  # Also runs `go test ./...`
```

## Implementation Notes

We are generating some helper classes on types by using
http://clipperhouse.github.io/gen/.  Do the following to regenerate these if
necessary:

```bash
go get github.com/clipperhouse/gen
go get github.com/clipperhouse/set
export PATH=$PATH:$GOPATH/bin  # If you haven't already
go generate
```

## Generated Stdlib

To regenerate the standard library, do:

```bash
./reset_stdast_go.sh && go run cmd/dumpstdlibast.go
```

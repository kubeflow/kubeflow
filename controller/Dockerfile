ARG GOLANG_VERSION=1.11.2
FROM golang:$GOLANG_VERSION as builder

# Copy in the go src
RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/controller
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/controller
COPY go.mod go.mod
COPY go.sum go.sum
COPY pkg/    pkg/
COPY cmd/    cmd/

ENV GO111MODULE=on
RUN go build -gcflags 'all=-N -l' -o bin/manager cmd/manager/main.go

# Copy the controller-manager into a thin image
FROM ubuntu:latest
WORKDIR /root/
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/controller/bin/manager .
ENTRYPOINT ["./bin/manager"]

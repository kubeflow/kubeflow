ARG GOLANG_VERSION=1.11.2
FROM golang:$GOLANG_VERSION as builder

# install vim 
RUN apt-get update && apt-get install -y vim

# install dlv debugger
RUN go get -u github.com/derekparker/delve/cmd/dlv
RUN mkdir -p /opt/kubeflow
ENV PATH /go/bin:/usr/local/go/bin:$PATH

# Copy in the go src
RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/controller
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/controller
COPY go.mod go.mod
COPY go.sum go.sum
COPY pkg/    pkg/
COPY cmd/    cmd/
COPY hack/dlv.sh /opt/kubeflow/

ENV GO111MODULE=on
RUN go build -gcflags 'all=-N -l' -a -o bin/manager cmd/manager/main.go

# Copy the controller-manager into a thin image
FROM ubuntu:latest
WORKDIR /root/
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/controller/bin/manager .
ENTRYPOINT ["./bin/manager"]

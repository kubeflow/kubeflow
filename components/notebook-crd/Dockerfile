# Build the manager binary
FROM golang:1.11.2 as builder

# Copy in the go src
WORKDIR /go/src/github.com/kubeflow/kubeflow/components/notebook-crd
COPY pkg/    pkg/
COPY cmd/    cmd/
COPY go.mod .

ENV GO111MODULE=on

# Build
RUN go build -gcflags 'all=-N -l' -o manager cmd/manager/main.go

# Copy the controller-manager into a thin image
FROM ubuntu:latest
WORKDIR /
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/notebook-crd/manager .
ENTRYPOINT ["/manager"]

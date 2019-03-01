# Build the manager binary
ARG GOLANG_VERSION=1.11.5
FROM golang:${GOLANG_VERSION} as builder

# Copy in the go src
WORKDIR /go/src/github.com/kubeflow/kubeflow/components/profile-controller
COPY pkg/    pkg/
COPY cmd/    cmd/
COPY go.mod .

ENV GO111MODULE=on

# Build
RUN go build -gcflags 'all=-N -l' -o manager cmd/manager/main.go

# Copy the controller-manager into a thin image
FROM ubuntu:latest
WORKDIR /
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/profile-controller/manager .
ENTRYPOINT ["/manager"]

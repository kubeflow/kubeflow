# Build the manager binary
ARG GOLANG_VERSION=1.12
FROM golang:${GOLANG_VERSION} as builder

# Copy in the go src
WORKDIR /go/src/github.com/kubeflow/kubeflow/components/gcp-admission-webhook
COPY . .

ENV GO111MODULE=on

# Build
RUN go build -gcflags 'all=-N -l' -o webhook main.go

# Copy the controller-manager into a thin image
FROM ubuntu:latest
WORKDIR /
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/gcp-admission-webhook/webhook .
ENTRYPOINT ["/webhook"]

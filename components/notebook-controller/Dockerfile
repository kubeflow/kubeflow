# Build the manager binary
#
# The Docker context is expected to be:
#
# ${PATH_TO_KUBEFLOW/KUBEFLOW repo}/components
#
# This is necessary because the Jupyter controller now depends on
# components/common
ARG GOLANG_VERSION=1.17
FROM golang:${GOLANG_VERSION} as builder

WORKDIR /workspace

# Copy the Go Modules manifests
COPY notebook-controller /workspace/notebook-controller
COPY common /workspace/common

# cache deps before building and copying source so that we don't need to re-download as much
# and so that source changes don't invalidate our downloaded layer
RUN cd /workspace/notebook-controller && go mod download

WORKDIR /workspace/notebook-controller

# Build
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=on go build -a -mod=mod -o manager main.go

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/base:debug
WORKDIR /
COPY --from=builder /workspace/notebook-controller/manager .
COPY --from=builder /workspace/notebook-controller/third_party/license.txt third_party/license.txt
COPY --from=builder /go/pkg/mod/github.com/hashicorp third_party/hashicorp
ENTRYPOINT ["/manager"]

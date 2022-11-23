# Build the manager binary
# The Docker context is expected to be:
#
# ${PATH_TO_KUBEFLOW/KUBEFLOW repo}/components
#
# This is necessary because the Jupyter controller now depends on
# components/common
FROM golang:1.17 as builder

WORKDIR /workspace
# Copy the Go Modules manifests
COPY tensorboard-controller /workspace/tensorboard-controller
COPY common /workspace/common
# cache deps before building and copying source so that we don't need to re-download as much
# and so that source changes don't invalidate our downloaded layer
RUN cd /workspace/tensorboard-controller && go mod download

WORKDIR /workspace/tensorboard-controller

# Build
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=on go build -a -o manager main.go 

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/static:nonroot
WORKDIR /
COPY --from=builder /workspace/tensorboard-controller/manager .
USER 65532:65532

ENTRYPOINT ["/manager"]

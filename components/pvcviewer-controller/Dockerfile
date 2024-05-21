# Build the manager binary
ARG GOLANG_VERSION=1.22.2
FROM golang:${GOLANG_VERSION} as builder

WORKDIR /workspace
# Copy the Go Modules manifests
COPY pvcviewer-controller/go.mod go.mod
COPY pvcviewer-controller/go.sum go.sum
# cache deps before building and copying source so that we don't need to re-download as much
# and so that source changes don't invalidate our downloaded layer
RUN go mod download

# Copy the go source
COPY pvcviewer-controller/main.go main.go
COPY pvcviewer-controller/api/ api/
COPY pvcviewer-controller/controllers/ controllers/

# Build
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=on go build -a -mod=mod -o manager main.go

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/static:nonroot
WORKDIR /
COPY --from=builder /workspace/manager .
USER 65532:65532

ENTRYPOINT ["/manager"]

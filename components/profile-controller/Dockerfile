# Build the manager binary
ARG GOLANG_VERSION=1.12.5
FROM golang:${GOLANG_VERSION} as builder

WORKDIR /workspace

# Download kubebuilder assets
RUN wget -O kubebuilder.tag.gz 'https://github.com/kubernetes-sigs/kubebuilder/releases/download/v2.3.0/kubebuilder_2.3.0_linux_amd64.tar.gz' && \
    mkdir -p bin/.kubebuilder && \
    tar xvfz kubebuilder.tag.gz -C bin/.kubebuilder --strip-components=2 && \
    rm kubebuilder.tag.gz

# Copy the Go Modules manifests
COPY go.mod go.mod
COPY go.sum go.sum
# cache deps before building and copying source so that we don't need to re-download as much
# and so that source changes don't invalidate our downloaded layer
RUN go mod download

# Copy the go source
COPY main.go main.go
COPY api/ api/
COPY controllers/ controllers/
COPY Makefile Makefile

# Build
RUN if [ "$(uname -m)" = "aarch64" ]; then \
        GOARCH=arm64 make manager; \
    else \
        KUBEBUILDER_ASSETS=$(pwd)/bin/.kubebuilder make test; \
        GOARCH=amd64 make manager; \
    fi

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/base:latest as serve
WORKDIR /
COPY third_party third_party
COPY --from=builder /workspace/bin/manager .
COPY --from=builder /go/pkg/mod/github.com/hashicorp third_party/library/

EXPOSE 8080

ENTRYPOINT ["/manager"]

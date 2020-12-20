ARG GOLANG_VERSION=1.15
FROM golang:${GOLANG_VERSION} as builder

WORKDIR /workspace

# Copy the Go Modules manifests
COPY access-management /workspace/access-management
COPY profile-controller /workspace/profile-controller

# cache deps before building and copying source so that we don't need to re-download as much
# and so that source changes don't invalidate our downloaded layer
RUN cd /workspace/access-management && go mod download

WORKDIR /workspace/access-management

RUN if [ "$(uname -m)" = "aarch64" ]; then \
        CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -gcflags 'all=-N -l' -o access-management main.go; \
    else \
        CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -gcflags 'all=-N -l' -o access-management main.go; \
    fi

RUN chmod a+rx access-management

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/base:latest as serve
WORKDIR /
COPY --from=builder /workspace/access-management/access-management .
COPY --from=builder /workspace/access-management/third_party/library/license.txt third_party/library/license.txt

EXPOSE 8081

CMD ["/access-management"]

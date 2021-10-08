ARG GOLANG_VERSION=1.17
FROM golang:${GOLANG_VERSION} as builder

WORKDIR /workspace

COPY . .
RUN go mod download
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
COPY third_party third_party
COPY --from=builder /workspace/access-management .
COPY --from=builder /go/pkg/mod/github.com/hashicorp third_party/library/

EXPOSE 8081

CMD ["/access-management"]

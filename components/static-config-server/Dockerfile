ARG GOLANG_VERSION=1.12.4
FROM golang:${GOLANG_VERSION} as builder

WORKDIR /workspace

COPY . .
RUN go mod download
RUN go build -gcflags 'all=-N -l' -o pub-key-server main.go
RUN chmod a+rx pub-key-server

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/base:latest as serve
WORKDIR /
COPY --from=builder /workspace/pub-key-server .

EXPOSE 8087

CMD ["/pub-key-server"]
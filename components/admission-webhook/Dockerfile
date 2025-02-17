# Build the manager binary
ARG GOLANG_VERSION=1.21
FROM golang:${GOLANG_VERSION} as builder

# Copy in the go src
WORKDIR /go/src/github.com/kubeflow/kubeflow/components/admission-webhook
COPY pkg/  pkg/
COPY . .

ENV GO111MODULE=on

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o webhook -a . ;
    
# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM gcr.io/distroless/static:nonroot

WORKDIR /
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/admission-webhook/webhook .

USER 65532:65532

ENTRYPOINT ["/webhook"]

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
    
# Copy the controller-manager into a distroless image
FROM gcr.io/distroless/static-debian10:fd0d99e8c54d7d7b2f3dd29f5093d030d192cbbc
WORKDIR /
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/admission-webhook/webhook .
ENTRYPOINT ["/webhook"]

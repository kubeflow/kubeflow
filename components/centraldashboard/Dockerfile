FROM golang:1.10 as builder

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.4.1/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

# Copy the code from the host and compile it
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/components/centraldashboard
COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure --vendor-only
COPY . ./
ENV PORT_1=8082
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix nocgo -o centraldashboard .
RUN pwd && ls

FROM alpine
RUN apk --no-cache add ca-certificates
WORKDIR /app
RUN pwd && ls
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/centraldashboard/centraldashboard /app
COPY --from=builder /go/src/github.com/kubeflow/kubeflow/components/centraldashboard/frontend /app
EXPOSE 8082
CMD [ "/app/centraldashboard" ]

FROM golang:1.10 AS builder

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.4.1/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

# Copy the code from the host and compile it
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/components/centraldashboard
COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure --vendor-only
COPY . ./
ENV PORT_1=8082
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix nocgo -o app .
EXPOSE 8082
ENTRYPOINT ["./app"]

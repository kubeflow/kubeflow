# Dockerfile to create an image suitable for building the bootstrapper.
FROM golang:1.8.2 as builder

# Install glide. We need this in order to fetch dependencies.
RUN curl https://glide.sh/get | sh

COPY ./ $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/

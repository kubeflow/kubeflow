# bootstrapper-builder contains the tool chain we need to build the image.
# This primarily means glide.
ARG GOLANG_VERSION=1.10.3
ARG GOLANG_GCFLAGS=""
FROM golang:${GOLANG_VERSION}

# Install glide. We need this in order to fetch dependencies.
RUN curl https://glide.sh/get | sh
RUN mkdir -p /opt/kubeflow

ENV PATH /go/bin:/usr/local/go/bin:$PATH

RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap

# Pull in dependencies. We don't check in vendor because that bloats
# the size of kubeflow/kubeflow and we want to keep it small since
# Users clone that repo to get our registry.
COPY ./glide* $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/
RUN cd $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/ && \
    glide install -v

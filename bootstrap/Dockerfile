# bootstrapper-builder contains the tool chain we need to build the image.
# This primarily means glide.
FROM gcr.io/kubeflow-images-public/bootstrapper-builder:v20180709-2ef5fe7a-dirty-39cf08 as builder

RUN mkdir -p /opt/kubeflow

ENV PATH /go/bin:/usr/local/go/bin:$PATH

RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap
COPY ./ $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/

# Pull in dependencies. We don't check in vendor because that bloats
# the size of kubeflow/kubeflow and we want to keep it small since
# Users clone that repo to get our registry.
RUN cd $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/ && \
    glide install -v

RUN go build -i -o /opt/kubeflow/bootstrapper ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/main.go

FROM golang:1.8.2

# We need gcloud to get gke credentials.
RUN wget -q https://dl.google.com/dl/cloudsdk/channels/rapid/google-cloud-sdk.tar.gz && \
    tar xzf google-cloud-sdk.tar.gz -C / && \
    rm google-cloud-sdk.tar.gz && \
    /google-cloud-sdk/install.sh \
    --disable-installation-options \
    --bash-completion=false \
    --path-update=false \
    --usage-reporting=false

RUN ln -sf /google-cloud-sdk/bin/gcloud /usr/local/bin/gcloud

# Install kubectl
# We don't install via gcloud because we want 1.10 which is newer than what's in gcloud.
RUN  curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.10.0/bin/linux/amd64/kubectl && \
    mv kubectl /usr/local/bin && \
    chmod a+x /usr/local/bin/kubectl

RUN git clone https://github.com/ksonnet/ksonnet.git /opt/ksonnet && \
	cd /opt/ksonnet && \
	git checkout v0.10.0-alpha.3

ARG registries
COPY $registries /opt/registries

# bootstrap is using ksonnet 0.11.0
RUN wget -q https://github.com/ksonnet/ksonnet/releases/download/v0.11.0/ks_0.11.0_linux_amd64.tar.gz && \
    tar xzf ks_0.11.0_linux_amd64.tar.gz -C . && \
    rm ks_0.11.0_linux_amd64.tar.gz && \
    cp ks_0.11.0_linux_amd64/ks /usr/local/bin && \
    rm -rf ks_0.11.0_linux_amd64

COPY --from=builder /opt/kubeflow/bootstrapper /opt/kubeflow/
COPY start.sh /opt/kubeflow/
COPY config/default.yaml /opt/kubeflow/
COPY image_registries.yaml /opt/kubeflow/

RUN chmod a+rx /opt/kubeflow/bootstrapper
RUN chmod a+rx /opt/kubeflow/start.sh

RUN apt-get update && apt-get install -y vim

# Set default values for USER, USER_ID, GROUP_ID
# The startup script will create the user and su to that user.
# We delay the user creation until runtime so that user can specify
# the user info at runtime.

# Work around for https://github.com/ksonnet/ksonnet/issues/298
ENV USER kubeflow
ENV USER_ID 1000
ENV GROUP_ID 1000
ENV GROUP kubeflow

WORKDIR /opt/kubeflow
CMD ["/opt/kubeflow/start.sh"]

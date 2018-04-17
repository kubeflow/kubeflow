# TODO(jlewi): How can we make it work with golang:1.8.2-alpine
FROM golang:1.8.2 as builder

RUN mkdir -p /opt/kubeflow

ENV PATH /go/bin:/usr/local/go/bin:$PATH

RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap
COPY ./ $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/

RUN go build -i -o /opt/kubeflow/bootstraper ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/main.go

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
	git checkout 68d8f751791db6b0e0798c34f0d72bda24926d8d

# TODO(jlewi): bootstrap is using an early dev version of ks (0.10) so we need
# to build ks at the same commit because the generated app won't work with
# earlier versions of ks.
RUN cd /opt/ksonnet && \
	mkdir -p /tmp/go/src/github.com/ksonnet && \
	ln -sf /opt/ksonnet /tmp/go/src/github.com/ksonnet/ksonnet && \
    cd /tmp/go/src/github.com/ksonnet/ksonnet && \
	export GOPATH=/tmp/go && \
	make install && \
    cp /tmp/go/bin/ks /usr/local/bin && \
    chmod a+rx /usr/local/bin/ks

RUN mkdir -p /opt/kubeflow

COPY --from=builder /opt/kubeflow/bootstraper /opt/kubeflow/
COPY start.sh /opt/kubeflow/

RUN chmod a+rx /opt/kubeflow/*

# Set default values for USER, USER_ID, GROUP_ID
# The startup script will create the user and su to that user.
# We delay the user creation until runtime so that user can specify
# the user info at runtime.

# Work around for https://github.com/ksonnet/ksonnet/issues/298
ENV USER kubeflow
ENV USER_ID 1000
ENV GROUP_ID 1000
ENV GROUP kubeflow

ENTRYPOINT ["/opt/kubeflow/start.sh"]

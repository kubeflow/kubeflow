#
# bootstrap_base
#
# TODO(jlewi): 2019-06-12 What is this file used for? Is it obsolete? A legacy from before we
# switched to using the multi-stage Dockerfile?
ARG GOLANG_VERSION=1.12
FROM golang:$GOLANG_VERSION as bootstrap_base

RUN apt-get update
RUN apt-get install -y unzip

# We need gcloud to get gke credentials.
RUN \
    cd /tmp && \
    wget -nv https://dl.google.com/dl/cloudsdk/release/install_google_cloud_sdk.bash && \
    chmod +x install_google_cloud_sdk.bash && \
    ./install_google_cloud_sdk.bash --disable-prompts --install-dir=/opt/

ENV PATH /go/bin:/usr/local/go/bin:/opt/google-cloud-sdk/bin:${PATH}

# use go modules
ENV GO111MODULE=on

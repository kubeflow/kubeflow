FROM google/cloud-sdk:alpine

RUN apk add --update jq openssl

RUN curl https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/linux/amd64/kubectl > /usr/local/bin/kubectl && chmod +x /usr/local/bin/kubectl

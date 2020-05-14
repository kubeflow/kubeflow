ARG BASE_IMAGE=google/cloud-sdk:alpine
FROM $BASE_IMAGE

RUN if [ "$(uname -m)" = "aarch64" ]; then \
        apt-get update && apt-get install -y jq openssl && \
        curl https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/linux/arm64/kubectl > /usr/local/bin/kubectl && chmod +x /usr/local/bin/kubectl; \
    else \
        apk add --update jq openssl && \
        curl https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/linux/amd64/kubectl > /usr/local/bin/kubectl && chmod +x /usr/local/bin/kubectl; \
    fi

FROM ubuntu:xenial

RUN set -ex \
    && apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
    curl \
    wget \
    python3-dev \
    python3-setuptools \
    python3-pip \
    && python3 -V \
    && apt-get clean \
    && rm -rf \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/* \
    /usr/share/man \
    /usr/share/doc \
    /usr/share/doc-base

RUN pip3 install --upgrade wheel && \
    pip3 install requests && \
    pip3 install prometheus_client && \
    pip3 install kubernetes && \
    pip3 install google-api-python-client

COPY service-readiness/kubeflow-readiness.py /opt/

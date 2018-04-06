FROM alpine:latest

RUN apk -U add build-base

WORKDIR /opt

COPY . /opt/jsonnet

RUN cd jsonnet && \
    make && \
    mv jsonnet /usr/local/bin && \
    rm -rf /opt/jsonnet

ENTRYPOINT ["/usr/local/bin/jsonnet"]

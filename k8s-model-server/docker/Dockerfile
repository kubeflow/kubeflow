FROM ubuntu:16.04

MAINTAINER Kenneth Owens <kowens@google.com>

ENV MS_USER=model-server

RUN apt-get update && apt-get install -y \
        build-essential \
        curl \
        libcurl3-dev \
        git \
        libfreetype6-dev \
        libpng12-dev \
        libzmq3-dev \
        pkg-config \
        python-dev \
        python-numpy \
        python-pip \
        software-properties-common \
        swig \
        zip \
        zlib1g-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN echo "deb [arch=amd64] http://storage.googleapis.com/tensorflow-serving-apt stable \
 tensorflow-model-server \
 tensorflow-model-server-universal" \ 
 | tee /etc/apt/sources.list.d/tensorflow-serving.list && \
 curl https://storage.googleapis.com/tensorflow-serving-apt/tensorflow-serving.release.pub.gpg \
 | apt-key add -
  
RUN apt-get update && apt-get install -y \
        tensorflow-model-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN set -x \
    && useradd $MS_USER \
    && [ `id -u $MS_USER` -eq 1000 ] \
    && [ `id -g $MS_USER` -eq 1000 ] 
    
CMD ["/bin/bash"]
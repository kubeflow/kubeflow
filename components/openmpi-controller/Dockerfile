FROM python:3.6

USER root

ENV HOME /root

RUN mkdir -p /kubeflow/openmpi/openmpi-controller
ADD requirements.txt /kubeflow/openmpi/openmpi-controller/requirements.txt
ADD controller /kubeflow/openmpi/openmpi-controller/controller

RUN pip3 install -r /kubeflow/openmpi/openmpi-controller/requirements.txt

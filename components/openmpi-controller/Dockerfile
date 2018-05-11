FROM python:3.6

USER root

ENV HOME /root

RUN mkdir -p /openmpi-controller
ADD requirements.txt /openmpi-controller/requirements.txt
ADD controller /openmpi-controller/controller

RUN pip3 install -r /openmpi-controller/requirements.txt

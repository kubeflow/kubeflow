FROM python:3.6

USER root

ENV HOME /root

ADD requirements.txt $HOME
ADD controller $HOME/controller

RUN pip3 install -r $HOME/requirements.txt

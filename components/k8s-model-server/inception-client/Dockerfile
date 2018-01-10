FROM python:2.7.14

RUN pip install grpcio tensorflow tensorflow-serving-api

RUN mkdir -p /opt/label

RUN mkdir -p /data

VOLUME /data

WORKDIR /opt/label

COPY label.py ./
COPY run.sh ./

ENTRYPOINT ["bash", "run.sh"]
CMD []

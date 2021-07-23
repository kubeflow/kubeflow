ARG BASE_CONTAINER=platiagro/platiagro-notebook-image:0.3.0
FROM $BASE_CONTAINER

WORKDIR /app

EXPOSE 5000
ENTRYPOINT ["seldon-core-microservice"]
CMD ["Model", "REST", \
    "--service-type", "MODEL", \
    "--persistence", "0", \
    "--parameters", "[]", \
    "--log-level", "INFO", \
    "--single-threaded", "1"]

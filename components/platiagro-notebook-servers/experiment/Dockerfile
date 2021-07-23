ARG BASE_CONTAINER=platiagro/platiagro-notebook-image:0.3.0
FROM $BASE_CONTAINER

COPY docker-entrypoint.py /usr/local/bin/
RUN chmod +x "/usr/local/bin/docker-entrypoint.py"

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.py"]

CMD []

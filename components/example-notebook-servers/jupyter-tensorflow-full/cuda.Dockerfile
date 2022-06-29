FROM docker.io/kubeflownotebookswg/notebook-servers/jupyter-tensorflow-cuda:master-e9324d39

# install - requirements.txt
COPY --chown=jovyan:users requirements.txt /tmp/requirements.txt
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt

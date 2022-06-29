FROM docker.io/kubeflownotebookswg/notebook-servers/jupyter-pytorch-cuda:master-c7ed4a32

# install - requirements.txt
COPY --chown=jovyan:users requirements.txt /tmp/requirements.txt
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt

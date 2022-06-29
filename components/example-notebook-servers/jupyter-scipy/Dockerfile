FROM public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter:master-434b10ab

# install - requirements.txt
COPY --chown=jovyan:users requirements.txt /tmp/requirements.txt
RUN python3 -m pip install -r /tmp/requirements.txt --quiet --no-cache-dir \
 && rm -f /tmp/requirements.txt

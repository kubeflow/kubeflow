FROM public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio:master-87b7d015

# Switching to the root user for this installation
# is only necessary when building the image with Kaniko
USER root

RUN conda install --quiet --yes \
    'r-tidyverse=1.3.0' && \
    conda clean --all -f -y && \
    chown -R ${NB_USER}:users $CONDA_DIR && \
    chown -R ${NB_USER}:users $HOME

USER $NB_UID

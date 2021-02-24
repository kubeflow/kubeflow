FROM davidspek/kubeflow-ubuntu-datascience-base:0.2

USER $NB_UID

COPY requirements.txt .
RUN python3 -m pip install -r \
    requirements.txt --quiet --no-cache-dir \
    && rm -f requirements.txt

# R packages which gets installed globally.
RUN conda install --quiet --yes \
    'r-caret=6.0*' \
    'r-crayon=1.4*' \
    'r-devtools=2.3*' \
    'r-forecast=8.13*' \ 
    'r-hexbin=1.28*' \
    'r-htmltools=0.5*' \
    'r-htmlwidgets=1.5*' \ 
    'r-nycflights13=1.0*' \
    'r-randomforest=4.6*' \
    'r-rcurl=1.98*' \
    'r-rmarkdown=2.7*' \
    'r-rsqlite=2.2*' \
    'r-shiny=1.6*' \
    'r-tidyverse=1.3*' \
    'rpy2=3.4*' && \
    conda clean --all -f -y && \
    chown -R ${NB_USER}:users $CONDA_DIR && \
    chown -R ${NB_USER}:users /home/$NB_USER

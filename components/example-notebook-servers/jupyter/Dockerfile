FROM public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/base:master-9d688f73

ARG NB_UI_TYPE=lab

ENV NB_UI_TYPE=${NB_UI_TYPE}

USER root

# Conda version
ARG conda_version="4.9.2"
# Miniforge installer patch version
ARG miniforge_patch_number="7"
# Miniforge installer architecture
ARG miniforge_arch="x86_64"
# Python implementation to use 
# can be either Miniforge3 to use Python or Miniforge-pypy3 to use PyPy
ARG miniforge_python="Miniforge3"

# Miniforge archive to install
ARG miniforge_version="${conda_version}-${miniforge_patch_number}"
# Miniforge installer
ARG miniforge_installer="${miniforge_python}-${miniforge_version}-Linux-${miniforge_arch}.sh"
# Miniforge checksum
ARG miniforge_checksum="91d5aa5f732b5e02002a371196a2607f839bab166970ea06e6ecc602cb446848"

# Use bash instead of sh
SHELL ["/bin/bash", "-c"]

# Install -- Node Dependencies
RUN apt-get update \
 && apt-get install -y \
 && curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
 && echo 'deb https://deb.nodesource.com/node_14.x focal main' \
    > /etc/apt/sources.list.d/nodesource.list \
 && curl -s https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo 'deb https://dl.yarnpkg.com/debian/ stable main' \
    > /etc/apt/sources.list.d/yarn.list \
 && echo "**** install build dependencies ****" \
 && apt-get update \
 && apt-get install -y \
    nodejs \
    yarn \
 && yarn cache clean \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Configure environment
ENV CONDA_DIR /opt/conda
ENV SHELL /bin/bash
ENV NB_USER $NB_USER
ENV NB_UID $NB_UID
ENV LC_ALL en_US.UTF-8
ENV PATH "$CONDA_DIR/bin:$PATH"
ENV CONDA_VERSION "${conda_version}"
ENV MINIFORGE_VERSION "${miniforge_version}"

# Enable prompt color in the skeleton .bashrc before creating the default NB_USER
# hadolint ignore=SC2016
RUN sed -i 's/^#force_color_prompt=yes/force_color_prompt=yes/' /etc/skel/.bashrc \
   # Add call to conda init script see https://stackoverflow.com/a/58081608/4413446
 && echo 'eval "$(command conda shell.bash hook 2> /dev/null)"' >> /etc/skel/.bashrc 

# Create Conda dir and set user permissions for Jovyan
# Create /jovyan dir and set user permissions for Jovyan to store files in home directory
RUN mkdir -p $CONDA_DIR \
 && chown -R ${NB_USER}:users $CONDA_DIR \
 && mkdir -p /jovyan \
 && chown -R ${NB_USER}:users /jovyan

USER $NB_UID
ARG PYTHON_VERSION=3.8.8

WORKDIR /tmp

# Prerequisites installation: conda, pip
RUN wget --quiet "https://github.com/conda-forge/miniforge/releases/download/${miniforge_version}/${miniforge_installer}" \
 && echo "${miniforge_checksum} *${miniforge_installer}" | sha256sum --check \
 && /bin/bash "${miniforge_installer}" -f -b -p $CONDA_DIR \
 && rm "${miniforge_installer}" \
    # Conda configuration see https://conda.io/projects/conda/en/latest/configuration.html
 && echo "conda ${CONDA_VERSION}" >> $CONDA_DIR/conda-meta/pinned \
 && conda config --system --set auto_update_conda false \
 && conda config --system --set show_channel_urls true \
 && if [ ! $PYTHON_VERSION = 'default' ]; then conda install --yes python=$PYTHON_VERSION; fi \
 && conda list python | grep '^python ' | tr -s ' ' | cut -d '.' -f 1,2 | sed 's/$/.*/' >> $CONDA_DIR/conda-meta/pinned \
 && conda install --quiet --yes \
    "conda=${CONDA_VERSION}" \
    'pip' \
 && conda update --all --quiet --yes \
 && conda clean --all -f -y \
 && rm -rf /home/$NB_USER/.cache/yarn \
 && chown -R ${NB_USER}:users $CONDA_DIR \
 && chown -R ${NB_USER}:users /home/$NB_USER

# Install Jupyter Notebook and Lab
# Generate a notebook server config
# Cleanup temporary files
# Correct permissions
# Do all this in a single RUN command to avoid duplicating all of the
# files across image layers when the permissions change
COPY --chown=jovyan:users requirements.txt .

RUN python3 -m pip install -r \
    requirements.txt --quiet --no-cache-dir \
 && conda clean --all -f -y \
 && jupyter notebook --generate-config \
 && rm -rf $CONDA_DIR/share/jupyter/lab/staging \
 && rm -rf /home/$NB_USER/.cache/yarn \
 && chown -R ${NB_USER}:users $CONDA_DIR \
 && chown -R ${NB_USER}:users /home/$NB_USER \
 && rm -f requirements.txt

# Copy Init and service scripts into containers
# and ensure jovyan is user (so S6 doesn't need to run as root)
COPY --chown=jovyan:users root/ /

WORKDIR $HOME
EXPOSE 8888

RUN cp -r $HOME/ /jovyan

ENTRYPOINT ["/init"]

FROM public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/base:master-4892c583

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

ARG UBUNTU_VERSION=focal
ARG CRAN_LINUX_VERSION=cran40
ARG CRAN="https://packagemanager.rstudio.com/all/__linux__/focal/latest"
ARG PANDOC_VERSION=2.11.4-1
ARG PANDOC_DL_URL=https://github.com/jgm/pandoc/releases/download/2.11.4/pandoc-${PANDOC_VERSION}-amd64.deb

# Configure environment
ENV CONDA_DIR=/opt/conda
ENV TZ=Etc/UTC
ENV SHELL=/bin/bash
ENV LC_ALL=en_US.UTF-8
ENV R_VERSION=4.0.3
ENV RSTUDIO_VERSION_ARG=1.4.1106
ENV R_LIBS_SITE=$R_HOME/site-library
ENV PATH "$CONDA_DIR/bin:$PATH"
ENV R_HOME ${CONDA_DIR}/lib/R
ENV CONDA_VERSION="${conda_version}"
ENV MINIFORGE_VERSION="${miniforge_version}"


USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    file \
    libapparmor1 \
    libgc1c2 \
    libclang-dev \
    libcurl4-openssl-dev \
    libedit2 \
    libobjc4 \
    libssl-dev \
    libpq5 \
    psmisc \
    procps \
    python-setuptools \
    less \
    libopenblas-base \
    dirmngr \
    gpg \
    gpg-agent \
    sudo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Use bash instead of sh
SHELL ["/bin/bash", "-c"]

# Create Conda dir and set user permissions for Jovyan
# Create /jovyan dir and set user permissions for Jovyan to store files in home directory
RUN mkdir -p $CONDA_DIR && \
    chown -R ${NB_USER}:users $CONDA_DIR && \
    mkdir -p /jovyan && \
    chown -R ${NB_USER}:users /jovyan

USER $NB_UID

ARG PYTHON_VERSION=3.8.8

WORKDIR /tmp

# Prerequisites installation: conda, pip
RUN wget --quiet "https://github.com/conda-forge/miniforge/releases/download/${miniforge_version}/${miniforge_installer}" && \
    echo "${miniforge_checksum} *${miniforge_installer}" | sha256sum --check && \
    /bin/bash "${miniforge_installer}" -f -b -p $CONDA_DIR && \
    rm "${miniforge_installer}" && \
    # Conda configuration see https://conda.io/projects/conda/en/latest/configuration.html
    echo "conda ${CONDA_VERSION}" >> $CONDA_DIR/conda-meta/pinned && \
    conda config --system --set auto_update_conda false && \
    conda config --system --set show_channel_urls true && \
    if [ ! $PYTHON_VERSION = 'default' ]; then conda install --yes python=$PYTHON_VERSION; fi && \
    conda list python | grep '^python ' | tr -s ' ' | cut -d '.' -f 1,2 | sed 's/$/.*/' >> $CONDA_DIR/conda-meta/pinned && \
    conda install --quiet --yes \
    "conda=${CONDA_VERSION}" \
    "r-base=${R_VERSION}" \
    'pip' && \
    conda update --all --quiet --yes && \
    conda clean --all -f -y && \
    rm -rf $HOME/.cache/yarn && \
    chown -R ${NB_USER}:users $CONDA_DIR && \
    chown -R ${NB_USER}:users $HOME

USER root

# Add RSPM repo and install littler & docopt
RUN echo "options(repos = c(CRAN = \"${CRAN}\"), download.file.method = 'libcurl')" >> ${R_HOME}/etc/Rprofile.site && \
    # Set HTTPUserAgent for RSPM (https://github.com/rocker-org/rocker/issues/400)
    echo  'options(HTTPUserAgent = sprintf("R/%s R (%s)", getRversion(), paste(getRversion(), R.version$platform, R.version$arch, R.version$os)))' >> ${R_HOME}/etc/Rprofile.site && \
    # Add a library directory (for user-installed packages)
    mkdir -p ${R_HOME}/site-library && \
    chown ${NB_USER}:staff ${R_HOME}/site-library && \
    chmod g+ws ${R_HOME}/site-library && \
    # Fix library path
    echo "R_LIBS=\${R_LIBS-'${R_HOME}/library'}" >> ${R_HOME}/etc/Renviron && \
    echo "R_LIBS_SITE='${R_HOME}/site-library'" >> ${R_HOME}/etc/Renviron && \
    echo "TZ=${TZ}" >> ${R_HOME}/etc/Renviron && \
    # Use littler installation scripts
    Rscript -e "install.packages(c('littler', 'docopt'), repos=\"${CRAN}\")" && \
    ln -s ${R_LIBS_SITE}/littler/examples/install.r /usr/local/bin/install.r && \
    ln -s ${R_LIBS_SITE}/littler/examples/install2.r /usr/local/bin/install2.r && \
    ln -s ${R_LIBS_SITE}/littler/examples/installGithub.r /usr/local/bin/installGithub.r && \
    ln -s ${R_LIBS_SITE}/littler/bin/r /usr/local/bin/r

ENV PATH "/usr/lib/rstudio-server/bin:$PATH"

## UBUNTU_VERSION is not generally valid: only works for xenial and bionic, not other releases,
## and does not understand numeric versions. (2020-04-15)
#RSTUDIO_URL="https://s3.amazonaws.com/rstudio-ide-build/server/${UBUNTU_VERSION}/amd64/rstudio-server-${DOWNLOAD_VERSION}-amd64.deb"
## hardwire bionic for now...
ARG RSTUDIO_URL="https://s3.amazonaws.com/rstudio-ide-build/server/bionic/amd64/rstudio-server-${RSTUDIO_VERSION_ARG}-amd64.deb"

RUN wget $RSTUDIO_URL -q --show-progress \
    --progress=bar:force:noscroll && \
    dpkg -i rstudio-server-*-amd64.deb && \
    rm rstudio-server-*-amd64.deb && \
    # Fix container not running when built with Kaniko without --whitelist-var-run=false
    mv -n /var/run/rstudio-server.pid /run/ && \
    mv -n /var/run/rstudio-server/ /run/

## RStudio wants an /etc/R, will populate from $R_HOME/etc
RUN mkdir -p /etc/R && \
    echo "PATH=${PATH}" >> ${R_HOME}/etc/Renviron

## Make RStudio compatible with case when R is built from source 
## (and thus is at /usr/local/bin/R), because RStudio doesn't obey
## path if a user apt-get installs a package
## use more robust file locking to avoid errors when using shared volumes:
RUN R_BIN=`which R` \
    && echo "rsession-which-r=${R_BIN}" > /etc/rstudio/rserver.conf \
    && echo "lock-type=advisory" > /etc/rstudio/file-locks

# Disable authentication and set user in environment
RUN echo "auth-none=1" >> /etc/rstudio/rserver.conf && \
    echo "USER=${NB_USER}" >> /etc/environment

# Create /jovyan dir and set user permissions for Jovyan to store files in home directory
# Add jovyan to staff group and change ownership of /etc/s6 
# and R related folders to user jovyan and staff group
RUN mkdir -p /jovyan && \
    chown -R ${NB_USER}:users /jovyan && \
    addgroup ${NB_USER} staff && \
    chown -R ${NB_USER}:staff /etc/s6 && \
    chown -R ${NB_USER}:staff /var/lib/rstudio-server && \
    chown -R ${NB_USER}:staff /etc/rstudio && \
    chown -R ${NB_USER}:staff /etc/R

## configure git not to request password each time
RUN git config --system credential.helper 'cache --timeout=3600' \
    && git config --system push.default simple

RUN wget ${PANDOC_DL_URL} -O pandoc-amd64.deb -q \
    --show-progress --progress=bar:force:noscroll && \
    dpkg -i pandoc-amd64.deb && \
    rm pandoc-amd64.deb


## Symlink pandoc & standard pandoc templates for use system-wide
## Copy files from $HOME to /jovyan
## Ensure $CONDA_DIR is owned by $NB_USER
RUN export PANDOC_TEMPLATES_VERSION=`pandoc -v | grep -oP "(?<=pandoc\s)[0-9\.]+$"` && \
    wget https://github.com/jgm/pandoc-templates/archive/${PANDOC_TEMPLATES_VERSION}.tar.gz -q --show-progress --progress=bar:force:noscroll \
    -O pandoc-templates.tar.gz && \
    rm -fr /opt/pandoc/templates && \
    mkdir -p /opt/pandoc/templates && \
    tar xvf pandoc-templates.tar.gz && \
    cp -r pandoc-templates*/* /opt/pandoc/templates && \
    rm -rf pandoc-templates* && \
    rm -fr /root/.pandoc && \
    mkdir /root/.pandoc && \
    ln -s /opt/pandoc/templates /root/.pandoc/templates && \
    chown -R ${NB_USER}:users $HOME && \
    cp -r $HOME/ /jovyan && \
    chown -R ${NB_USER}:users $CONDA_DIR

USER $NB_UID

# Copy Init and service scripts into containers
# and ensure jovyan is user (so S6 doesn't need to run as root)
COPY --chown=jovyan:staff root/ /

WORKDIR $HOME
EXPOSE 8888

ENTRYPOINT ["/init"]

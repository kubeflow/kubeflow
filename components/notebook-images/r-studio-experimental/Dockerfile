FROM davidspek/kubeflow-ubuntu-webide-base:0.2

ENV UBUNTU_VERSION focal
ENV CRAN_LINUX_VERSION cran40
ENV CRAN "https://packagemanager.rstudio.com/all/__linux__/focal/latest"
ENV R_VERSION 4.0.3
ENV RSTUDIO_VERSION_ARG 1.4.1103
ENV R_HOME /usr/lib/R
ENV R_LIBS_SITE $R_HOME/site-library
ENV PANDOC_VERSION 2.11.4-1
ENV PANDOC_DL_URL https://github.com/jgm/pandoc/releases/download/2.11.4/pandoc-${PANDOC_VERSION}-amd64.deb
ENV TZ Etc/UTC

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    less \
    libopenblas-base \
    dirmngr \
    gpg \
    gpg-agent \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN echo "deb http://cloud.r-project.org/bin/linux/ubuntu ${UBUNTU_VERSION}-${CRAN_LINUX_VERSION}/" >> /etc/apt/sources.list && \
    gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9 && \
    gpg -a --export E298A3A825C0D65DFD57CBB651716619E084DAB9 | apt-key add -

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    r-base-dev=${R_VERSION}* \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add RSPM repo and install littler & docopt
RUN echo "options(repos = c(CRAN = \"${CRAN}\"), download.file.method = 'libcurl')" >> ${R_HOME}/etc/Rprofile.site && \
    # Set HTTPUserAgent for RSPM (https://github.com/rocker-org/rocker/issues/400)
    echo  'options(HTTPUserAgent = sprintf("R/%s R (%s)", getRversion(), paste(getRversion(), R.version$platform, R.version$arch, R.version$os)))' >> ${R_HOME}/etc/Rprofile.site && \
    # Add a library directory (for user-installed packages)
    mkdir -p ${R_HOME}/site-library && \
    chown root:staff ${R_HOME}/site-library && \
    chmod g+ws ${R_HOME}/site-library && \
    # Fix library path
    echo "R_LIBS=\${R_LIBS-'${R_HOME}/site-library:${R_HOME}/library'}" >> ${R_HOME}/etc/Renviron && \
    echo "TZ=${TZ}" >> ${R_HOME}/etc/Renviron && \
    # Use littler installation scripts
    Rscript -e "install.packages(c('littler', 'docopt'), repos=\"${CRAN}\")" && \
    ln -s ${R_LIBS_SITE}/littler/examples/install.r /usr/local/bin/install.r && \
    ln -s ${R_LIBS_SITE}/littler/examples/install2.r /usr/local/bin/install2.r && \
    ln -s ${R_LIBS_SITE}/littler/examples/installGithub.r /usr/local/bin/installGithub.r && \
    ln -s ${R_LIBS_SITE}/littler/bin/r /usr/local/bin/r

RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
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
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# set version for s6 overlay
ARG OVERLAY_VERSION="v2.2.0.1"
ARG OVERLAY_ARCH="amd64"

# add s6 overlay
ADD https://github.com/just-containers/s6-overlay/releases/download/${OVERLAY_VERSION}/s6-overlay-${OVERLAY_ARCH}-installer /tmp/
RUN chmod +x /tmp/s6-overlay-${OVERLAY_ARCH}-installer && /tmp/s6-overlay-${OVERLAY_ARCH}-installer / && rm /tmp/s6-overlay-${OVERLAY_ARCH}-installer

ENV PATH "/usr/lib/rstudio-server/bin:$PATH"

## UBUNTU_VERSION is not generally valid: only works for xenial and bionic, not other releases,
## and does not understand numeric versions. (2020-04-15)
#RSTUDIO_URL="https://s3.amazonaws.com/rstudio-ide-build/server/${UBUNTU_VERSION}/amd64/rstudio-server-${DOWNLOAD_VERSION}-amd64.deb"
## hardwire bionic for now...
ENV  DOWNLOAD_VERSION ${RSTUDIO_VERSION_ARG}
ENV RSTUDIO_URL="https://s3.amazonaws.com/rstudio-ide-build/server/bionic/amd64/rstudio-server-${DOWNLOAD_VERSION}-amd64.deb"

RUN wget $RSTUDIO_URL \
    && dpkg -i rstudio-server-*-amd64.deb \
    && rm rstudio-server-*-amd64.deb

## RStudio wants an /etc/R, will populate from $R_HOME/etc
RUN mkdir -p /etc/R \
    && echo "PATH=${PATH}" >> ${R_HOME}/etc/Renviron

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

RUN addgroup ${NB_USER} staff

RUN apt-get -yq update \
    && apt-get -yq install --no-install-recommends \
    apache2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

## configure git not to request password each time
RUN git config --system credential.helper 'cache --timeout=3600' \
    && git config --system push.default simple

RUN wget ${PANDOC_DL_URL} -O pandoc-amd64.deb \
    && dpkg -i pandoc-amd64.deb \
    && rm pandoc-amd64.deb


## Symlink pandoc & standard pandoc templates for use system-wide
RUN export PANDOC_TEMPLATES_VERSION=`pandoc -v | grep -oP "(?<=pandoc\s)[0-9\.]+$"` && \
    wget https://github.com/jgm/pandoc-templates/archive/${PANDOC_TEMPLATES_VERSION}.tar.gz -O pandoc-templates.tar.gz && \
    rm -fr /opt/pandoc/templates && \
    mkdir -p /opt/pandoc/templates && \
    tar xvf pandoc-templates.tar.gz && \
    cp -r pandoc-templates*/* /opt/pandoc/templates && \
    rm -rf pandoc-templates* && \
    rm -fr /root/.pandoc && \
    mkdir /root/.pandoc && \
    ln -s /opt/pandoc/templates /root/.pandoc/templates && \
    chown -R ${NB_USER}:users $HOME

COPY rstudio-proxy.conf /etc/apache2/sites-enabled/rstudio-proxy.conf

RUN echo 'Listen 8888' > /etc/apache2/ports.conf

COPY root/ /

RUN a2enmod proxy proxy_ajp proxy_http rewrite deflate headers proxy_balancer proxy_connect proxy_html proxy_wstunnel

WORKDIR $HOME

EXPOSE 8888

CMD ["/init"]

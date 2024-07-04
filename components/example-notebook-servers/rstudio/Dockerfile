#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<base>
FROM $BASE_IMG

ARG TARGETARCH

# args - software versions (python)
ARG MINIFORGE_VERSION=24.3.0-0
ARG PIP_VERSION=24.0
ARG PYTHON_VERSION=3.11.9

# args - software versions (R)
# https://dailies.rstudio.com/release/
ARG RSTUDIO_VERSION=2024.04.1-748
ARG R_BASE_VERSION=4.3.3
ARG R_RETICULATE_VERSION=1.37.0
ARG R_PNG_VERSION=0.1_8

USER root

# install - binary rstudio dependencies
RUN apt-get -yq update \
 && apt-get -yq install --no-install-recommends \
    dpkg-sig \
    libapparmor1 \
    libc6 \
    libclang-dev \
    libedit2 \
    libpq5 \
    libssl-dev \
    psmisc \
    rrdtool \
    sudo \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# setup environment for conda
ENV CONDA_DIR /opt/conda
ENV PATH "${CONDA_DIR}/bin:${PATH}"
RUN mkdir -pv ${CONDA_DIR} \
 && chmod 2775 ${CONDA_DIR} \
 && echo ". /opt/conda/etc/profile.d/conda.sh" >> ${HOME}/.bashrc \
 && echo ". /opt/conda/etc/profile.d/conda.sh" >> /etc/profile \
 && echo "conda activate base" >> ${HOME}/.bashrc \
 && echo "conda activate base" >> /etc/profile \
 && chown -R ${NB_USER}:${NB_GID} ${CONDA_DIR} \
 && chown -R ${NB_USER}:${USERS_GID} ${HOME}

# setup environment for R
ENV R_HOME ${CONDA_DIR}/lib/R

# rstudio logs to a file by default, but we need to see them in the container logs
ENV RS_LOG_LEVEL WARN
ENV RS_LOGGER_TYPE stderr

# rstudio must run as a named user.
# we change the UID of 'jovyan' at runtime to match the UID of the container.
# this is important for environments like OpenShift where the container has a random UID.
RUN chmod g+w /etc/passwd

USER $NB_UID

# install - conda, pip, python
RUN case "${TARGETARCH}" in \
      amd64) MINIFORGE_ARCH="x86_64" ;; \
      arm64) MINIFORGE_ARCH="aarch64" ;; \
      ppc64le) MINIFORGE_ARCH="ppc64le" ;; \
      *) echo "Unsupported architecture: ${TARGETARCH}"; exit 1 ;; \
    esac \
 && curl -fsSL "https://github.com/conda-forge/miniforge/releases/download/${MINIFORGE_VERSION}/Miniforge3-${MINIFORGE_VERSION}-Linux-${MINIFORGE_ARCH}.sh" -o /tmp/Miniforge3.sh \
 && curl -fsSL "https://github.com/conda-forge/miniforge/releases/download/${MINIFORGE_VERSION}/Miniforge3-${MINIFORGE_VERSION}-Linux-${MINIFORGE_ARCH}.sh.sha256" -o /tmp/Miniforge3.sh.sha256 \
 && echo "$(cat /tmp/Miniforge3.sh.sha256 | awk '{ print $1; }')  /tmp/Miniforge3.sh" | sha256sum -c - \
 && rm /tmp/Miniforge3.sh.sha256 \
 && /bin/bash /tmp/Miniforge3.sh -b -f -p ${CONDA_DIR} \
 && rm /tmp/Miniforge3.sh \
 && conda config --system --set auto_update_conda false \
 && conda config --system --set show_channel_urls true \
 && echo "python ==${PYTHON_VERSION}" >> ${CONDA_DIR}/conda-meta/pinned \
 && conda install -y -q \
    python=${PYTHON_VERSION} \
    pip=${PIP_VERSION} \
 && conda update -y -q --all \
 && conda clean -a -f -y

# install - r packages
RUN echo "r-base ==${R_BASE_VERSION}" >> ${CONDA_DIR}/conda-meta/pinned \
 && conda install -y -q \
    r-base=${R_BASE_VERSION} \
    r-reticulate=${R_RETICULATE_VERSION} \
    r-png=${R_PNG_VERSION} \
 && conda clean -a -f -y

# set default CRAN repo to RSPM (it has pre-compiled R packages, increasing user install speed)
RUN echo 'options(repos=c(CRAN="https://packagemanager.rstudio.com/all/__linux__/jammy/latest"))' >> ${R_HOME}/etc/Rprofile.site \
 && echo 'options(HTTPUserAgent=sprintf("R/%s R (%s)", getRversion(), paste(getRversion(), R.version$platform, R.version$arch, R.version$os)))' >> ${R_HOME}/etc/Rprofile.site

# R needs TZ set
ENV TZ Etc/UTC
RUN echo "TZ=${TZ}" >> ${R_HOME}/etc/Renviron.site

USER root

# install - rstudio-server
RUN case "${TARGETARCH}" in \
      amd64) RSTUDIO_DEB_URL="https://download2.rstudio.org/server/jammy/amd64/rstudio-server-${RSTUDIO_VERSION}-amd64.deb" ;; \
      arm64) RSTUDIO_DEB_URL="https://s3.amazonaws.com/rstudio-ide-build/server/jammy/arm64/rstudio-server-${RSTUDIO_VERSION}-arm64.deb" ;; \
      *) echo "Unsupported architecture: ${TARGETARCH}"; exit 1 ;; \
    esac \
 && curl -fsSL "${RSTUDIO_DEB_URL}" -o /tmp/rstudio-server.deb \
    # validate the build signature
 && export GNUPGHOME="$(mktemp -d)" \
 && gpg --keyserver keys.gnupg.net --keyserver pgp.surfnet.nl --recv-keys 3F32EE77E331692F \
 && gpg --keyserver keys.openpgp.org --recv-keys 51C0B5BB19F92D60 \
 && dpkg-sig --verify /tmp/rstudio-server.deb \
 && rm -rf "${GNUPGHOME}" \
    # install rstudio-server
 && dpkg -i /tmp/rstudio-server.deb \
 && rm -f /tmp/rstudio-server.deb \
    # the default DB path '/var/lib/rstudio-server' causes permission issues when running as a random UID (like in OpenShift)
 && echo "provider=sqlite" > /etc/rstudio/database.conf \
 && echo "directory=/tmp/rstudio_db" >> /etc/rstudio/database.conf \
    # use advisory file-locks to improve PVC support
 && echo "lock-type=advisory" > /etc/rstudio/file-locks \
    # allow kubeflow to display rstudio in an iframe
 && echo "www-frame-origin=same" >> /etc/rstudio/rserver.conf \
    # allows the non-root NB_USER to run rstudio
 && chown -R ${NB_USER}:${NB_GID} ${R_HOME} \
 && chown -R ${NB_USER}:${NB_GID} /etc/rstudio \
 && chown -R ${NB_USER}:${NB_GID} /run/rstudio-server* \
 && chown -R ${NB_USER}:${NB_GID} /usr/lib/rstudio-server \
 && chown -R ${NB_USER}:${NB_GID} /var/lib/rstudio-server \
 && chown -R ${NB_USER}:${NB_GID} /var/log/rstudio \
    # give group same access as user (needed for OpenShift)
 && chmod -R g=u ${R_HOME} \
 && chmod -R g=u /etc/rstudio \
 && chmod -R g=u /run/rstudio-server* \
 && chmod -R g=u /usr/lib/rstudio-server \
 && chmod -R g=u /var/lib/rstudio-server \
 && chmod -R g=u /var/log/rstudio

# tell rstudio to use conda python by setting `RETICULATE_PYTHON` with `--rsession-path=/opt/rsession.sh`
COPY --chown=${NB_USER}:${NB_GID} --chmod=755 rsession.sh /opt
RUN chmod +x /opt/rsession.sh

# s6 - copy scripts
COPY --chown=${NB_USER}:${NB_GID} --chmod=755 s6/ /etc

# s6 - 01-copy-tmp-home
# NOTE: the contents of $HOME_TMP are copied to $HOME at runtime
#       this is a workaround because a PVC will be mounted at $HOME
#       and the contents of $HOME will be hidden
RUN cp -p -r -T "${HOME}" "${HOME_TMP}" \
    # give group same access as user (needed for OpenShift)
 && chmod -R g=u "${HOME_TMP}"

USER $NB_UID

EXPOSE 8888
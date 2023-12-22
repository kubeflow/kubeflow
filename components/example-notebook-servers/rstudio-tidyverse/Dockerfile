#
# NOTE: Use the Makefiles to build this image correctly.
#

ARG BASE_IMG=<rstudio>
FROM $BASE_IMG

# args - software versions
ARG R_TIDYVERSE_VERSION="2.0.0"

# install - r-tidyverse
RUN conda install -y -q \
    r-tidyverse=${R_TIDYVERSE_VERSION} \
 && conda clean -a -f -y